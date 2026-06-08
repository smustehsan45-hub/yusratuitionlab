import React from "react";
import { Link } from "react-router-dom";

export const PricingPage = () => {
  return (
    <>
      {/* START SECTION TOP */}
      <section className="section-top">
        <div className="container">
          <div className="col-lg-10 offset-lg-1 text-center">
            <div
              className="section-top-title wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
              data-wow-offset="0"
            >
              <h1>Pricing Plan</h1>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li> / Pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* START PRICING */}
      <section id="pricing" className="pricing-content section-padding">
        <div className="container">
          <div className="row text-center">

            {/* PLAN 1 */}
            <div
              className="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.1s"
            >
              <div className="single-pricing">
                <div className="price-head">
                  <h2>Starter</h2>
                  <span></span><span></span><span></span>
                  <span></span><span></span><span></span>
                </div>

                <h1 className="price">$29</h1>
                <h5>Monthly</h5>

                <ul>
                  <li>15 website</li>
                  <li>50GB Disk Space</li>
                  <li>50 Email Accounts</li>
                  <li>50GB Monthly Bandwidth</li>
                  <li>10 Subdomains</li>
                  <li>15 Domains</li>
                  <li>Unlimited Support</li>
                </ul>

                <a className="btn_one" href="#">
                  Get start
                </a>
              </div>
            </div>

            {/* PLAN 2 */}
            <div
              className="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
            >
              <div className="single-pricing">
                <div className="price-head">
                  <h2>Popular</h2>
                  <span></span><span></span><span></span>
                  <span></span><span></span><span></span>
                </div>

                <h1 className="price">$49</h1>
                <h5>Monthly</h5>

                <ul>
                  <li>15 website</li>
                  <li>50GB Disk Space</li>
                  <li>50 Email Accounts</li>
                  <li>50GB Monthly Bandwidth</li>
                  <li>10 Subdomains</li>
                  <li>15 Domains</li>
                  <li>Unlimited Support</li>
                </ul>

                <a className="btn_one" href="#">
                  Get start
                </a>
              </div>
            </div>

            {/* PLAN 3 */}
            <div
              className="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
            >
              <div className="single-pricing single-pricing-white">
                <div className="price-head">
                  <h2>Advance</h2>
                  <span></span><span></span><span></span>
                  <span></span><span></span><span></span>
                </div>

                <span className="price-label">Best</span>

                <h1 className="price">$69</h1>
                <h5>Monthly</h5>

                <ul>
                  <li>15 website</li>
                  <li>50GB Disk Space</li>
                  <li>50 Email Accounts</li>
                  <li>50GB Monthly Bandwidth</li>
                  <li>10 Subdomains</li>
                  <li>15 Domains</li>
                  <li>Unlimited Support</li>
                </ul>

                <a className="btn_one" href="#">
                  Get start
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};