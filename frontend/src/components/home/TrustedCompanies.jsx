import React from "react";
import "./LandingPage.css";

const TrustedCompanies = () => {
  const logos = [
    {
      src: "https://content-management-files.canva.com/ad90400c-500e-4b63-8d25-6c155cfc2ecf/hubspot-light-theme.png",
      alt: "HubSpot",
    },
    {
      src: "https://content-management-files.canva.com/057168c7-ab29-4454-b06a-31ed1f161105/sony-light-theme.png",
      alt: "Sony Music",
    },
    {
      src: "https://content-management-files.canva.com/532da61c-6de8-4428-ac69-3fae7926b7dd/salesforce-light-theme.png",
      alt: "Salesforce",
    },
    {
      src: "https://content-management-files.canva.com/7116f431-c121-4055-abf1-50866cf6c920/skyscanner-light-theme.png",
      alt: "Skyscanner",
    },
    {
      src: "https://content-management-files.canva.com/df5fad20-95d3-4de4-91e7-575909523fbd/reddit-light-theme.png",
      alt: "Reddit",
    },
    {
      src: "https://content-management-files.canva.com/0effd4e5-5c27-4788-b7b3-ae2b753c23dd/danone-light-theme.png",
      alt: "Danone",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
        Trusted by Well-Known Companies
      </h2>

      <div className="mt-6 overflow-hidden relative py-10">
        <div className="flex space-x-8 animate-scroll">
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="w-36 flex-shrink-0">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-12 max-w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind Animation */}
      <style>
        {`
            @keyframes scroll {
            from { transform: translateX(0); }
          to { transform: translateX(-100%); }
          }
           .animate-scroll {
             animation: scroll 20s linear infinite;
         padding-bottom: 5px; /* Optional: Adjust spacing */
           }
  
          `}
      </style>
    </section>
  );
};

export default TrustedCompanies;
