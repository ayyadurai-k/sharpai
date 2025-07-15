import React, { useState, useEffect } from 'react';
import hr from '../../assets/hr.png';
import waves from "../../assets/waves.webp";
import { ArrowRight, Building2, Download, Shield, User, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MainContent() {
    const staticTitle = "Find Your ";
    const animatedWords = [
        "Candidate",
        "Resume",
        "Hiring Decision"
    ];

    const [animatedWord, setAnimatedWord] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoginHovered, setIsLoginHovered] = useState(false);
    const registernavigate = useNavigate()
    const loginnavigate = useNavigate()

    useEffect(() => {
        const currentWord = animatedWords[wordIndex];
        if (charIndex < currentWord.length) {
            const typing = setTimeout(() => {
                setAnimatedWord(prev => prev + currentWord[charIndex]);
                setCharIndex(prev => prev + 1);
            }, 100);
            return () => clearTimeout(typing);
        } else {
            const hold = setTimeout(() => {
                setCharIndex(0);
                setAnimatedWord('');
                setWordIndex(prev => (prev + 1) % animatedWords.length);
            }, 2000);
            return () => clearTimeout(hold);
        }
    }, [charIndex, wordIndex]);
    const animationStyle = {
        animation: "moveUpDown 2s ease-in-out infinite"
    };
    const moveUpDownAnimation = `
        @keyframes moveUpDown {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-3px);
            }
            100% {
                transform: translateY(0);
            }
        }
    `;

    return (
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between pt-10 pb-10 px-4 mx-auto max-w-screen-xl container bg-slate-50">
            <style>{moveUpDownAnimation}</style>
            {/* Left Side Content */}
            <div className="w-full lg:w-1/2 text-left">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">
                    {staticTitle}{" "}
                    <br />
                    Perfect  <span className="text-blue-600 pt-4">{animatedWord}</span>
                    <span className="inline-block w-1 h-8 bg-gray-800 animate-pulse ml-1 rounded-sm" />
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Streamline your recruitment process with our modern platform. Access, review, and manage resumes effortlessly.
                </p>
                <div className="flex gap-4">
                    {/* Start Free Trial Button */}
                    <button
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                         onClick={()=> registernavigate('/Recuriterregister')}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 text-lg rounded-full shadow-md hover:brightness-110 flex items-center transition-all duration-200"
                    >
                        Register
                        <span
                            className={`ml-2 h-5 w-5 transform transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100 translate-x-1' : 'opacity-0 translate-x-0'
                                }`}
                        >
                            <ArrowRight />
                        </span>
                    </button>

                    {/* Login Button */}
                    <button
                        onMouseEnter={() => setIsLoginHovered(true)}
                        onMouseLeave={() => setIsLoginHovered(false)}
                        onClick={()=> loginnavigate('/Recuriterlogin')}
                        className={`text-white px-8 py-3 text-lg rounded-full shadow-md flex items-center hover:brightness-110 transition-all duration-300 ${isLoginHovered
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 '
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 '
                            }`}
                    >
                        Login
                        <span
                            className={`ml-2 h-5 w-5 transform transition-all duration-300 ease-in-out ${isLoginHovered ? 'opacity-100 translate-x-1' : 'opacity-0 translate-x-0'
                                }`}
                        >
                            <User />
                        </span>
                    </button>
                </div>
            </div>

            {/* Right Side Image */}
            <div className="relative w-full lg:w-1/2 mb-10 lg:mb-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${waves})` }}>

                {/* Top Left: Company Count */}
                <div className="absolute top-10 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md text-sm font-medium text-gray-800 bg-blue-100 flex items-center space-x-2" style={animationStyle}>
                    <Download className="h-6 w-6 text-blue-600 transition-all duration-300 ease-in-out hover:text-blue-500" />
                    <span className='hidden md:inline'>500+ Resumes</span>
                </div>

                {/* Top Right: Resume Count */}
                <div className="absolute top-2 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md text-sm font-medium text-gray-800 bg-green-200 flex items-center space-x-2" style={animationStyle}>
                    <Shield className="h-6 w-6 text-green-600 transition-all duration-300 ease-in-out hover:text-green-500" />
                    <span className='hidden md:inline'>200+ Company </span>
                </div>

                {/* Bottom Left: HR Count */}
                <div className="absolute bottom-8 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md text-sm font-medium text-gray-800 bg-yellow-100 flex items-center space-x-2" style={animationStyle}>
                    <Users className="h-6 w-6 text-yellow-600 transition-all duration-300 ease-in-out hover:text-yellow-500" />
                    <span className='hidden md:inline'> 500 HR</span>
                </div>

                {/* Bottom Right: Jobs Placed */}
                <div className="absolute bottom-8 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md text-sm font-medium text-gray-800 bg-pink-100 flex items-center space-x-2" style={animationStyle}>
                    <Building2 className="h-6 w-6 text-pink-600 transition-all duration-300 ease-in-out hover:text-pink-500" />
                    <span className='hidden md:inline'>500+ Placed Jobs</span>
                </div>

                <img
                    src={hr}
                    alt="Recruitment Process"
                    className="w-full h-auto object-cover"
                />
            </div>

        </section>
    );
}

export default MainContent;
