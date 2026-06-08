 import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Category } from "./pages/Category";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "./App.css";
import { Courses } from "./pages/Courses";
import { CourseDetails } from "./pages/CouseDetails";
import { Instructors } from "./pages/Instructor";
import { InstructorDetails } from "./pages/InstructorDetails";
import { PricingPage } from "./pages/Pricing";
import { Faq } from "./pages/Faq";
import { Error } from "./pages/Error";
import { ContactUs } from "./pages/ContactUS";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { TutorDashboard } from "./pages/TutorDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Apply } from "./pages/Apply";
import { UserDashboard } from "./pages/UserDashboard";

 const App =()=>{
  return <>
  <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />}  />
    <Route path="/about" element={<About />}  />
    <Route path="/category" element={<Category />}  />
    <Route path="/course" element={<Courses />}  />
    <Route path="/course-details" element={<CourseDetails />}  />
    <Route path="/instructor" element={<Instructors />}  />
    <Route path="/ins-details" element={<InstructorDetails />}  />
    <Route path="/pricing" element={<PricingPage />}  />
    <Route path="/faq" element={<Faq />}  />
    <Route path="/404" element={<Error />}  />
    <Route path="/contact" element={<ContactUs />}  />
    <Route path="/signin" element={<SignIn />}  />
    <Route path="/signup" element={<SignUp />}  />
    <Route path="/apply" element={<Apply />}  />
    <Route path="/dashboard" element={<UserDashboard />}  />
    <Route path="/tutor-dashboard" element={<TutorDashboard />}  />
    <Route path="/admin-dashboard" element={<AdminDashboard />}  />
  </Routes>
  <Footer />
  </BrowserRouter>
  </>
}

export default App;