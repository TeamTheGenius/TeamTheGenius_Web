import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BackIcon() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return windowWidth <= 546 ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="34"
      viewBox="0 0 22 34"
      fill="none"
      onClick={onClick}
      className="cursor-pointer"
    >
      <path
        d="M21.3425 28.979L8.59857 17L21.3425 5.02098C21.5336 4.84127 21.5534 4.54434 21.3877 4.3409L18.4093 0.684235C18.3217 0.576641 18.1932 0.510307 18.0548 0.501102C17.9163 0.491894 17.7803 0.540642 17.6792 0.635681L0.657549 16.6357C0.557014 16.7302 0.5 16.862 0.5 17C0.5 17.138 0.557014 17.2698 0.657549 17.3643L17.6792 33.3643C17.7803 33.4594 17.9163 33.5081 18.0548 33.4989C18.1932 33.4897 18.3217 33.4234 18.4093 33.3158L21.3877 29.6591C21.5534 29.4557 21.5336 29.1587 21.3425 28.979Z"
        fill="white"
        stroke="black"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="32"
      viewBox="0 0 20 32"
      fill="none"
      onClick={onClick}
      className="cursor-pointer"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.86854 16L20 28.3433L17.0216 32L0 16L17.0216 0L20 3.65666L6.86854 16Z"
        fill="#282828"
      />
    </svg>
  );
}

export default BackIcon;
