import SocialLinkButtons from './template/SocialLinkButtons';

function Footer() {
  return (
    <footer className="bg-white px-10 pb-6 pt-10 md:px-20">
      <div className="mx-auto mb-10 flex flex-wrap justify-between">
        <div className="xl:1/2 mb-8 w-full pr-12 md:mb-0 md:w-1/3 lg:w-1/3">
          <p className="mb-4 text-2xl font-bold text-black">
            <span className="text-purple-600">eventme</span>
          </p>
          <p className="text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="mb-8 w-full pr-8 md:w-1/3 md:pl-8 lg:w-1/3">
          <h3 className="mb-4 text-xl font-semibold text-black">Payments</h3>
          <div className="flex gap-4">
            <button className="rounded-md bg-slate-100 p-2 text-black hover:bg-white">
              Pay 1
            </button>
            <button className="rounded-md bg-slate-100 p-2 text-black hover:bg-white">
              Pay 2
            </button>
            <button className="rounded-md bg-slate-100 p-2 text-black hover:bg-white">
              Pay 3
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/3 md:pl-8 lg:w-1/3">
          <h3 className="mb-4 text-xl font-semibold text-black">Newsletter</h3>
          <form className="mb-6">
            <input
              id="input-email-newsletter"
              type="email"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-500"
            >
              Subscribe
            </button>
          </form>
          <SocialLinkButtons />
        </div>
      </div>
      <div className="copyright flex justify-between py-1">
        <p className="text-slate-400">&copy; All Rights Reserved</p>
        <p className="text-slate-400">v1.0.0</p>
      </div>
    </footer>
  );
}

export default Footer;
