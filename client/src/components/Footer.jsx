const Footer = () => {
  return (
    <footer className="bg-gray-300 text-black py-5 mt-16">
      <div className="text-center text-sm text-gray-700">
        &copy; {new Date().getFullYear()} wirlo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
