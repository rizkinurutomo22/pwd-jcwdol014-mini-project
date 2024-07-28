import cron from 'node-cron';
import prisma from '@/prisma';

// At midnight every day
cron.schedule('0 0 * * *', async () => {
  const now = new Date();

  // Delete expired referrals
  await prisma.referral.deleteMany({
    where: {
      expiresAt: {
        lt: now,
      },
    },
  });

  // Delete expired discounts
  await prisma.discount.deleteMany({
    where: {
      expiresAt: {
        lt: now,
      },
    },
  });

  console.log('Expired data cleaned up at', now);
});

export default cron;
