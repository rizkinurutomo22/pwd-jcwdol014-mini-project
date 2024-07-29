import prisma from '@/prisma';

export async function handleTransaction(
  userId: number,
  eventId: number,
  totalTickets: number,
) {
  try {
    // Ambil data pengguna
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        discount: true,
        referralsSent: true,
      },
    });

    // Ambil data event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!user || !event) {
      throw new Error('User or event not found');
    }

    // Ambil nilai diskon, jika ada
    const discountPercent = user.discount ? user.discount.discount : 0;

    // Hitung total poin yang diterima dari referrals
    const totalPoints = user.referralsSent.reduce(
      (acc, referral) => acc + referral.points,
      0,
    );

    // Hitung harga setelah diskon
    const discountAmount = (event.price * discountPercent) / 100;
    const priceAfterDiscount = event.price - discountAmount;

    // Hitung harga akhir setelah mengurangi poin
    const pointsValue = totalPoints;
    const finalPricePerTicket = priceAfterDiscount - pointsValue;
    const finalTotalPrice = finalPricePerTicket * totalTickets;

    // Buat transaksi baru
    const purchase = await prisma.purchase.create({
      data: {
        userId: user.id,
        eventId: event.id,
        totalTickets: totalTickets,
        totalPrice: finalTotalPrice,
      },
    });

    // Hapus poin yang telah digunakan
    await prisma.referral.deleteMany({
      where: {
        referrerId: userId,
        points: {
          gt: 0,
        },
      },
    });

    // Hapus diskon yang telah digunakan
    if (user.discount) {
      await prisma.discount.delete({
        where: {
          userId: user.id,
        },
      });
    }

    // Buat entri attendee untuk setiap tiket
    for (let i = 0; i < totalTickets; i++) {
      await prisma.attendee.create({
        data: {
          userId: user.id,
          eventId: event.id,
          purchaseId: purchase.id,
        },
      });
    }
    return purchase;
  } catch (error) {
    console.error('Error handling transaction:', error);
    throw error;
  }
}
