import React from "react";

import expert1 from "../../../images/experts/expert-1.jpg";
import expert2 from "../../../images/experts/expert-2.jpg";
import expert3 from "../../../images/experts/expert-3.jpg";
import expert4 from "../../../images/experts/expert-4.jpg";
import expert5 from "../../../images/experts/expert-5.jpg";
import expert6 from "../../../images/experts/expert-6.png";
import Expert from "../Expert/Expert";

const experts = [
  { id: 1, name: "Will Smith", img: expert1 },
  { id: 2, name: "Chris Homes", img: expert2 },
  { id: 3, name: "Chapa Khor", img: expert3 },
  { id: 4, name: "Bonds Sith", img: expert4 },
  { id: 5, name: "Kem Jone", img: expert5 },
  { id: 6, name: "Lampa Dusom", img: expert6 },
];

const Experts = () => {
  return (
    <div id="experts" className="container mt-40 pt-40 py-5">
      <h2 className="text-center text-primary mb-4">Meet Our Experts</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {experts.map((expert) => (
          <Expert key={expert.id} expert={expert}></Expert>
        ))}
      </div>
    </div>
  );
};

export default Experts;
