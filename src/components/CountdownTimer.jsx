import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const Countdown = ({ deadline, postId }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const currentDate = new Date().getTime();
      const distance = new Date(deadline + "T23:59:59Z") - currentDate;

      //   if (distance <= 0) {
      //     setTimeLeft("Expired");
      //     return;
      //   }

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s remaining`);
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [deadline]);

  return (
    <p id={`countdown-${postId}`} className="countdown">
      {timeLeft}
    </p>
  );
};

// propTypes validation
Countdown.propTypes = {
  deadline: PropTypes.string.isRequired, // Expecting a string representing the date
  postId: PropTypes.number.isRequired, // Expecting a number for the post ID
};

export default Countdown;
