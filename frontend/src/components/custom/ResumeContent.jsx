import React, { useEffect } from "react";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";

import AOS from "aos";
import "aos/dist/aos.css";

function ResumeContent() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);
  return (
    <section>
      <section className=" container mx-auto px-6 py-14 mt-32  sm:py-12 sm:px-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="SSection1 flex flex-col items-start text-start md:text-left p-5">
            {/* AI-logo */}
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.333 13.144a12.884 12.884 0 0 1 .927-.235l.209-.044a.5.5 0 0 0 0-1 14.663 14.663 0 0 1-1.138-.276c-2.8-.815-4.275-2.382-5.082-5.113a13.224 13.224 0 0 1-.103-.37l-.084-.331a16.311 16.311 0 0 1-.12-.539.493.493 0 0 0-.473-.371.493.493 0 0 0-.475.376 14.724 14.724 0 0 1-.366 1.45l-.002.006c-.832 2.648-2.348 4.104-5.021 4.888a12.601 12.601 0 0 1-.927.235l-.21.045a.5.5 0 0 0 0 1 14.723 14.723 0 0 1 1.14.275c2.809.813 4.278 2.362 5.082 5.105l.083.299.02.077c.019-.016.06.332.08.317.023.098.046.198.068.3l.009.04.036.174a.493.493 0 0 0 .483.413.493.493 0 0 0 .477-.387 16.114 16.114 0 0 1 .196-.859 12.797 12.797 0 0 1 .17-.593l.002-.005c.832-2.645 2.346-4.094 5.019-4.877Zm-5.864 2.934a7.982 7.982 0 0 1 1.51-2.162 7.922 7.922 0 0 1 2.193-1.55 7.877 7.877 0 0 1-2.246-1.612 8.07 8.07 0 0 1-1.454-2.115 8.007 8.007 0 0 1-1.511 2.168A7.927 7.927 0 0 1 8.77 12.36a7.841 7.841 0 0 1 2.233 1.592 7.99 7.99 0 0 1 1.466 2.127Zm4.293-10.43a.153.153 0 0 0-.153.152h.004c0 .084.062.14.145.156l.023.006.032.007.008.003a3.2 3.2 0 0 1 1.104.508 2.487 2.487 0 0 1 .284.246l.003.002A2.521 2.521 0 0 1 18.872 8a4.606 4.606 0 0 1 .015.076.153.153 0 0 0 .152.154v-.004c.084 0 .14-.062.156-.145l.006-.023.008-.032c0-.002 0-.005.002-.008.113-.432.284-.801.508-1.104a2.479 2.479 0 0 1 .425-.444 2.521 2.521 0 0 1 1.172-.517.15.15 0 0 0 .15-.153c0-.084-.063-.14-.145-.156l-.024-.006-.032-.007-.008-.003a3.197 3.197 0 0 1-1.105-.509 2.5 2.5 0 0 1-.283-.245l-.002-.002a2.36 2.36 0 0 1-.158-.177 2.521 2.521 0 0 1-.517-1.172.153.153 0 0 0-.153-.153v.004c-.084 0-.14.062-.156.144l-.006.024-.007.032-.003.008a3.197 3.197 0 0 1-.508 1.104 2.48 2.48 0 0 1-.246.284l-.002.002a2.362 2.362 0 0 1-.177.158 2.52 2.52 0 0 1-1.115.506 3.248 3.248 0 0 1-.057.011ZM6.848 19.66a2.074 2.074 0 0 1 .93-.478 3.17 3.17 0 0 1 .14-.032.218.218 0 0 0 0-.436 5.028 5.028 0 0 1-.092-.028c-.386-.124-.706-.277-.963-.482a1.9 1.9 0 0 1-.225-.21 2.073 2.073 0 0 1-.47-.921 3.1 3.1 0 0 1-.031-.14.218.218 0 1 0-.436 0 5.43 5.43 0 0 1-.029.092c-.123.386-.277.706-.481.963a1.983 1.983 0 0 1-.21.225c-.242.22-.542.376-.922.47a3.036 3.036 0 0 1-.14.031.218.218 0 0 0 0 .436l.093.03c.385.122.705.276.962.48a2.105 2.105 0 0 1 .217.202l.008.009c.22.241.376.541.47.921a3.1 3.1 0 0 1 .032.14.218.218 0 0 0 .436 0l.028-.093c.124-.385.277-.705.482-.962a1.9 1.9 0 0 1 .201-.217Z"
                fill="currentColor"
              ></path>
              <path
                d="M9.6 5.613C7.91 5.466 6.98 4.874 6.484 3.7c-.179-.423-.304-.917-.384-1.5 0-.1-.1-.2-.2-.2s-.2.1-.2.2c-.08.583-.205 1.077-.384 1.5C4.821 4.874 3.891 5.466 2.2 5.613c-.1 0-.2.1-.2.2s.1.2.2.2c2.1.4 3.2 1.187 3.5 3.387 0 .1.1.2.2.2s.2-.1.2-.2c.3-2.2 1.4-2.987 3.5-3.387.1 0 .2-.1.2-.2s-.1-.2-.2-.2Z"
                fill="currentColor"
              ></path>
            </svg>
            {/* Heading & Paragraph */}
            <h1
              className="text-3xl md:text-4xl font-bold mt-5 leading-tight 
             bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text"
              data-aos="fade-right"
            >
              Create with AI
            </h1>

            <p
              className="text-lg md:text-xl text-gray-600 mt-2 leading-10 text-justify"
              data-aos="fade-right"
            >
              Unlock the magic of AI-powered resume optimization. With smart
              analysis, keyword enhancement,{" "}

              ATS compatibility, ProfileView sharpens your resume{" "}

              to help you stand out and land more opportunities{" "}
            </p>
          </div>

          <div className="flex justify-center">
            {/* image canva */}
            <img
              alt="Example of Canva's Magic Edit tool enhancing an image of a caveman with a generated professional shirt."
              src={image1}
              className="image1WW w-full h-auto max-w-sm rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 fKMyTg m-3 sm:py-12 sm:px-3 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center md:flex-row-reverse ">
          <div className="flex justify-center md:items-start text-center md:text-left order-2 md:order-1">
            <img
              alt="Canva's Magic Edit tool enhancing an image of a caveman with a generated professional shirt."
              src={image2}
              className="image1WW w-full h-auto max-w-sm rounded-xl"
              loading="lazy"
            />
          </div>

          <div className=" flex flex-col items-start text-start md:text-left order-1 md:order-2 p-5">
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.996 14.696c.003.1.004.202.004.304 0 5.68-4.581 10.288-10.25 10.333-.022.01-.058.026-.11.055-.148.08-.345.208-.585.384-.477.352-1.043.833-1.598 1.33-.551.494-1.074.987-1.462 1.357l-.194.186c-.11.103-.203.193-.276.262a7.69 7.69 0 0 1-.15.139 1.669 1.669 0 0 1-.09.075h-.001c-.012.01-.074.058-.158.101h-.001a1.006 1.006 0 0 1-1.168-.182 1 1 0 0 1-.292-.707v-3.02C7.269 24.967 3 20.482 3 15 3 9.293 7.626 4.667 13.333 4.667h5.334c.264 0 .525.01.784.03a7.281 7.281 0 0 0-.664 1.97h-5.454a8.333 8.333 0 1 0 0 16.666h1.332v2.695c.148-.137.302-.276.457-.416a24.946 24.946 0 0 1 1.747-1.45c.276-.203.556-.392.82-.534.22-.12.584-.295.978-.295a8.333 8.333 0 0 0 8.329-8.067 7.283 7.283 0 0 0 2-.57Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25 11.667a1 1 0 1 0 2 0V9h2.666a1 1 0 1 0 0-2H27V4.333a1 1 0 1 0-2 0V7h-2.667a1 1 0 1 0 0 2H25v2.667Z"
                fill="currentColor"
              ></path>
            </svg>
            <h2
              className="text-3xl md:text-4xl font-bold mt-5 leading-tight 
             bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text"
              data-aos="fade-left"
            >
              Create Together, Resume Better!
            </h2>


            <p
              className="text-lg md:text-xl text-gray-600 mt-2 leading-relaxed text-justify pt-2"
              data-aos="fade-left"
            >
              Bring your friends and family into the creative journey with
              ProfileView. Collaborate effortlessly, share ideas, and refine
              designs with AI-powered precision. Whether you're crafting
              resumes,{" "}

              portfolios, or career-boosting documents, teamwork unlocks
              endless possibilities.{" "}
              {" "}
              Invite others and design your future—together!
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 sm:py-12 sm:px-3 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="SSection1 flex flex-col items-start text-start md:text-left p-5">
            {/* AI-logo */}
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.364 9.034A2 2 0 0 1 22 11v7.838a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V11a2 2 0 0 1 1.633-1.966L5 7.954V6a2 2 0 0 1 2-2h3.004l.74-.585a2.03 2.03 0 0 1 2.51 0l.74.585H17a2 2 0 0 1 2 2v1.956l1.364 1.078ZM17.5 10.439V6a.5.5 0 0 0-.5-.5H7a.5.5 0 0 0-.5.5v4.439l5.5 4.4 5.5-4.4Zm-13.188.17A.5.5 0 0 0 3.5 11v7.839a.5.5 0 0 0 .5.5h16a.5.5 0 0 0 .5-.5V11a.5.5 0 0 0-.812-.39l-6.751 5.4a1.5 1.5 0 0 1-1.874 0l-6.75-5.4Z"
                fill="currentColor"
              ></path>
            </svg>
            {/* Heading & Paragraph */}
            <h1
              className="text-3xl md:text-4xl font-bold mt-5 leading-tight  bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text"
              data-aos="fade-right"
            >
              Print-Perfect Resumes,Instantly!
            </h1>

            <p
              className="text-lg md:text-xl text-gray-600 mt-2 leading-relaxed text-justify"
              data-aos="fade-right"
            >
              With ProfileView, your resume is designed for success both
              digitally and on paper.{" "}

              AI-powered formatting ensures a sleek, professional look with
              flawless alignment and crisp details.{" "}
              {" "}
              Just download, print, and impress—no extra edits needed!
            </p>
            {/* button */}
          </div>

          <div className="flex justify-center">
            {/* image canva */}
            <img
              alt="Example of Canva's Magic Edit tool enhancing an image of a caveman with a generated professional shirt."
              src={image3}
              className="image1WW w-full h-96  max-w-sm rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export default ResumeContent;
