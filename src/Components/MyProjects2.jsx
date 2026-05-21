import { useState } from "react";
import { projects } from "../Data/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";


const MyProjects = () => {
  const [showCard, setShowCard] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const handleShowCard = (project) => {
    setActiveProject(project);
    setShowCard(true);
  };

  return (
    <section id="projects" className="py-20 text-white">
      <div className="text-center">
        <h3 className="text-4xl font-semibold">
          My <span className="accent">Practice Projects</span>
        </h3>
        <br />
        <div className="flex max-w-6xl gap-6 px-5 mx-auto items-center relative">
          <div className="lg:w-12/1 w-full h-full"></div>
        </div>
      </div>

      <Swiper
        pagination={{
          clickable: true,
          renderBullet: (index, className) => `
            <span class="${className} w-8 h-8 flex items-center justify-center bg-gray-700 text-white font-bold rounded-full mx-1 cursor-pointer">
              ${index + 1}
            </span>
          `,
        }}
        modules={[Pagination, Autoplay]}
        slidesPerView={1.2}
        spaceBetween={20}
        breakpoints={{
          768: { slidesPerView: 2 },
        }}
        loop={true}
        autoplay={{ delay: 3000 }}
        className="mySwiper text-red-500"
      >
        {projects.map((project_info, indx) => (
          <SwiperSlide key={indx} className="text-white">
            <div className="h-fit w-full p-4 card relative group">
              <img
                src={project_info.img}
                alt="project_image"
                className="rounded-lg w-full"
              />
              <h3 className="p-2 text-center muted text-2xl">
                {project_info.name}
              </h3>

              {/* Hover Effect - Show "See Details" Button */}
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <button
                  onClick={() => handleShowCard(project_info)}
                  className="text-white btn-accent px-4 py-2 rounded-md"
                >
                  See Details
                </button>
              </div>

              <div className="flex gap-3 justify-center mt-3">
                <a
                  href={project_info.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl accent bg-gray-700 px-4 py-2 inline-block"
                >
                  View Code on GitHub
                </a>
                <a
                  href={project_info.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accent rounded-md bg-gray-800 px-4 py-2 inline-block"
                >
                  See Live
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Project Details Modal */}
      {showCard && activeProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-[90%] sm:w-[70%] lg:w-[50%] bg-white p-5 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setShowCard(false)}
              className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black"
            >
              See in Detail
            </button>

            {/* Project Image */}
            <img
              src={activeProject.img}
              alt="Project"
              className="rounded-lg w-full"
            />

            {/* Project Details */}
            <h2 className="text-xl font-bold text-gray-900 mt-4">
              {activeProject.name}
            </h2>
            <p className="text-gray-700 my-3">{activeProject.description}</p>

            {/* Features */}
            <h3 className="text-lg font-semibold text-gray-800">Features:</h3>
            <ul className="list-disc pl-6 text-gray-700">
              {activeProject.features?.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>

            {/* Technologies Used */}
            <h3 className="text-lg font-semibold text-gray-800 mt-3">
              Technologies Used:
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {activeProject.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 px-3 py-1 rounded-md text-gray-800"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Live Site Button */}
            <div className="mt-5 text-center">
              <a
                href={activeProject.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white btn-accent px-6 py-2 rounded-md inline-block"
              >
                View Live
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyProjects;
