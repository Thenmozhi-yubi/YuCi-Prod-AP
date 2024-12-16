

const Footer = ({ footerConfig }) => {
  if (!footerConfig) return null;

  const {
    logo,
    content,
    buttons,
    socialImages,
    products = { title: '', links: [] },
    company = { title: '', links: [] },
    resources = { title: '', links: [] },
    security = { title: '', links: [] },
    help = { title: '', links: [] },
  } = footerConfig;

  return (
    <footer className="bg-secondary text-white py-8  px-4 pt-44 z-0">
    <div className="container mx-auto max-w-4xl  px-4">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
        
        {/* First Column - Logo, Content, Buttons, Social Images */}
        <div className="col-span-1">
          {logo && <img src={logo} alt="Logo" className="mb-4 mx-auto sm:mx-0 w-16 h-12" />}
          {content && <p className="text-center sm:text-left">{content}</p>}
          <div className="mt-4 flex justify-center sm:justify-start space-x-4">
            {socialImages?.map((img, index) => (
              <a key={index} href="/" className="w-6 h-6">
                <img src={img} alt={`Social ${index + 1}`} className="w-full h-full object-cover" />
              </a>
            ))}
          </div>
          <div className="mt-6 text-center sm:text-left">
            {buttons?.map((button, index) => (
              <a
                key={index}
                href={button.link}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full block mb-2 sm:inline-block"
              >
                {button.text}
              </a>
            ))}
          </div>
        </div>
  
        {/* Second Column - Products */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-2">{products?.title}</h3>
          <ul className="text-sm">
            {products?.links?.map((link, index) => (
              <li key={index}>
                <a href={link.url} className="hover:underline">{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Third Column - Company */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-2">{company?.title}</h3>
          <ul className="text-sm">
            {company?.links?.map((link, index) => (
              <li key={index}>
                <a href={link.url} className="hover:underline">{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Fourth Column - Resources, Security, Help */}
        <div className="col-span-1">
          {resources?.title && (
            <>
              <h3 className="text-lg font-semibold mb-2">{resources.title}</h3>
              <ul className="text-sm">
                {resources?.links?.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className="hover:underline">{link.text}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
          {security?.title && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2">{security.title}</h3>
              <ul className="text-sm">
                {security?.links?.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className="hover:underline">{link.text}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
          {help?.title && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2">{help.title}</h3>
              <ul className="text-sm">
                {help?.links?.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className="hover:underline">{link.text}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  </footer>
  
  );
};

export default Footer;
