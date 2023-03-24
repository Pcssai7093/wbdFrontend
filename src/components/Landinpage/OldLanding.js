import React from "react";
const OldLanding = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#">
            <span class="text-warning">F</span>Code
          </a>{" "}
          <button
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            class="navbar-toggler"
            data-bs-target="#navbarSupportedContent"
            data-bs-toggle="collapse"
            type="button"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <button class="btn bg-primary text-light">SignUp</button>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#team"></a>
              </li>
              <li class="nav-item">
                <button class="btn bg-warning text-dark">LOG IN</button>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#team"></a>
              </li>
              <li class="nav-item">
                <button class="btn bg-info text-dark">Contact us</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <div
        class="carousel slide"
        data-bs-ride="carousel"
        id="carouselExampleIndicators"
      >
        <div class="carousel-indicators">
          <button
            aria-label="Slide 1"
            class="active"
            data-bs-slide-to="0"
            data-bs-target="#carouselExampleIndicators"
            type="button"
          ></button>{" "}
          <button
            aria-label="Slide 2"
            data-bs-slide-to="1"
            data-bs-target="#carouselExampleIndicators"
            type="button"
          ></button>{" "}
          <button
            aria-label="Slide 3"
            data-bs-slide-to="2"
            data-bs-target="#carouselExampleIndicators"
            type="button"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img alt="..." class="d-block w-100" src="img/ent3.jpg" />
            <div class="carousel-caption">
              <h5>Find the best freelancers</h5>
              <p>
                Best freelancers in programming, graphicDesign and Marketing
                Niche{" "}
              </p>
              <p>
                {" "}
                <button class="btn bg-warning text-dark">SIGN UP</button>
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img alt="..." class="d-block w-100" src="img/ent1.jpg" />
            <div class="carousel-caption">
              <h5>Find the best freelancers</h5>
              <p>
                Best freelancers in programming, graphicDesign and Marketing
                Niche{" "}
              </p>
              <p>
                <button class="btn bg-warning text-dark">SIGN UP</button>
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img alt="..." class="d-block w-100" src="img/ent2.jpg" />
            <div class="carousel-caption">
              <h5>Find the best freelancers</h5>
              <p>
                Best freelancers in programming, graphicDesign and Marketing
                Niche
              </p>
              <p>
                <button class="btn bg-warning text-dark">SIGN UP</button>
              </p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          data-bs-slide="prev"
          data-bs-target="#carouselExampleIndicators"
          type="button"
        >
          <span aria-hidden="true" class="carousel-control-prev-icon"></span>{" "}
          <span class="visually-hidden">Previous</span>
        </button>{" "}
        <button
          class="carousel-control-next"
          data-bs-slide="next"
          data-bs-target="#carouselExampleIndicators"
          type="button"
        >
          <span aria-hidden="true" class="carousel-control-next-icon"></span>{" "}
          <span class="visually-hidden">Next</span>
        </button>
      </div> */}
      {/* <!-- about section starts --> */}

      <section
        style={{ marginTop: "25px" }}
        class="about section-padding"
        id="about"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-12">
              <div class="about-img">
                <img alt="" class="img-fluid" src="img/i2.jpg" />
              </div>
            </div>
            <div class="col-lg-8 col-md-12 col-12 ps-lg-5 mt-md-5">
              <div class="about-text">
                <h2>We Provide the Best Quality Services Ever</h2>
                <p>
                  We have the most skilled people working at the most affordable
                  price , find the best people to help boost your business and
                  take your entrepreneurship Journey to next level
                </p>
                <a class="btn btn-warning" href="#">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- about section Ends -->
	<!-- services section Starts --> */}
      <section class="services section-padding" id="services">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="section-header text-center pb-5">
                <h2>Our Services</h2>
                <p>Different Services that we provide</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-12 col-lg-4">
              <div class="card text-white text-center bg-dark pb-2">
                <div class="card-body">
                  <i class="bi bi-laptop"></i>
                  <h3 class="card-title">Programming</h3>
                  <p class="lead">
                    Web,App and Game development , Ai and ml , Other Programming
                    Services
                  </p>
                  <button class="btn bg-warning text-dark">Read More</button>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-12 col-lg-4">
              <div class="card text-white text-center bg-dark pb-2">
                <div class="card-body">
                  <i class="bi bi-journal"></i>
                  <h3 class="card-title">Marketing</h3>
                  <p class="lead">
                    Digital Marketing,Google ads And Facebook ads{" "}
                  </p>
                  <button class="btn bg-warning text-dark">Read More</button>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-12 col-lg-4">
              <div class="card text-white text-center bg-dark pb-2">
                <div class="card-body">
                  <i class="bi bi-intersect"></i>
                  <h3 class="card-title">GraphicDesign</h3>
                  <p class="lead">
                    {" "}
                    graphic Designers highly skilled in photoshop,illustrator
                    and blender etc{" "}
                  </p>
                  <button class="btn bg-warning text-dark">Read More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- services section Ends -->
	<!-- portfolio strats -->  */}
      <section class="portfolio section-padding" id="portfolio">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="section-header text-center pb-5">
                <h2>Our Projects</h2>
                <p>SOME OF OUR MOST FAMOUS PROJECTS.</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-12 col-lg-4">
              <div class="card text-light text-center bg-white pb-2">
                <div class="card-body text-dark">
                  <div class="img-area mb-4">
                    <img alt="" class="img-fluid" src="img/fivver.png" />
                  </div>
                  <h3 class="card-title">Frelancer.com</h3>
                  <p class="lead">
                    It is one of the most successfully growing freelance
                    platform now
                  </p>
                  <button class="btn bg-warning text-dark">Learn More</button>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-12 col-lg-4">
              <div class="card text-light text-center bg-white pb-2">
                <div class="card-body text-dark">
                  <div class="img-area mb-4">
                    <img alt="" class="img-fluid" src="img/bereal.png" />
                  </div>
                  <h3 class="card-title">BeReal</h3>
                  <p class="lead">
                    Instagram Like App but more reality than fake things as seen
                    in Social Media{" "}
                  </p>
                  <button class="btn bg-warning text-dark">learn More</button>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-12 col-lg-4">
              <div class="card text-light text-center bg-white pb-2">
                <div class="card-body text-dark">
                  <div class="img-area mb-4">
                    <img alt="" class="img-fluid" src="img/valorant.png" />
                  </div>
                  <h3 class="card-title">Valorant</h3>
                  <p class="lead">
                    One of the most successful fps games of the latest era{" "}
                  </p>
                  <button class="btn bg-warning text-dark">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- portfolio ends -->
	<!-- team starts --> */}
      <section class="team section-padding" id="team">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="section-header text-center pb-5">
                <h2>Our Team</h2>
                <p>THIS IS OUR TEAM </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6 col-lg-3">
              <div class="card text-center">
                <div class="card-body">
                  <img
                    alt=""
                    class="img-fluid rounded-circle"
                    src="img/p4.jpg"
                  />
                  <h3 class="card-title py-2">PCR</h3>
                  <p class="card-text">FULL STACK DEV </p>
                  <p class="socials">
                    <i class="bi bi-twitter text-dark mx-1"></i>{" "}
                    <i class="bi bi-facebook text-dark mx-1"></i>{" "}
                    <i class="bi bi-linkedin text-dark mx-1"></i>{" "}
                    <i class="bi bi-instagram text-dark mx-1"></i>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3">
              <div class="card text-center">
                <div class="card-body">
                  <img
                    alt=""
                    class="img-fluid rounded-circle"
                    src="img/p3.jpg"
                  />
                  <h3 class="card-title py-2">Royal</h3>
                  <p class="card-text">FULL STACK DEV </p>
                  <p class="socials">
                    <i class="bi bi-twitter text-dark mx-1"></i>{" "}
                    <i class="bi bi-facebook text-dark mx-1"></i>{" "}
                    <i class="bi bi-linkedin text-dark mx-1"></i>{" "}
                    <i class="bi bi-instagram text-dark mx-1"></i>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3">
              <div class="card text-center">
                <div class="card-body">
                  <img
                    alt=""
                    class="img-fluid rounded-circle"
                    src="img/p1.jpg"
                  />
                  <h3 class="card-title py-2">steven</h3>
                  <p class="card-text">UI,UX</p>
                  <p class="socials">
                    <i class="bi bi-twitter text-dark mx-1"></i>{" "}
                    <i class="bi bi-facebook text-dark mx-1"></i>{" "}
                    <i class="bi bi-linkedin text-dark mx-1"></i>{" "}
                    <i class="bi bi-instagram text-dark mx-1"></i>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3">
              <div class="card text-center">
                <div class="card-body">
                  <img
                    alt=""
                    class="img-fluid rounded-circle"
                    src="img/p2.jpg"
                  />
                  <h3 class="card-title py-2">Rk&Tsk</h3>
                  <p class="card-text">MARKETING TEAM</p>
                  <p class="socials">
                    <i class="bi bi-twitter text-dark mx-1"></i>{" "}
                    <i class="bi bi-facebook text-dark mx-1"></i>{" "}
                    <i class="bi bi-linkedin text-dark mx-1"></i>{" "}
                    <i class="bi bi-instagram text-dark mx-1"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- team ends -->
	<!-- Contact starts --> */}

      {/*   
  <!-- contact ends -->
	<!-- footer starts --> */}
      <footer class="bg-dark p-2 text-center">
        <div class="container">
          <p class="text-white">All Right Reserved By @Fcode</p>
        </div>
      </footer>
    </>
  );
};

export default OldLanding;
