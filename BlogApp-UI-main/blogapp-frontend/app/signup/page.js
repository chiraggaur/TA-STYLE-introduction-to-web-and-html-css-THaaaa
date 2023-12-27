"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useRef, useCallback, useState } from "react";
import axios from "axios";
export default function Signup() {
  const [status, signUpResponse] = useState("");
  const router = useRouter();
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");

  const userSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/api/user/signup`,
        {
          username: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );
      signUpResponse(response.data.message);
      emailRef.current.value = "";
      nameRef.current.value = "";
      passwordRef.current.value = "";
    } catch (error) {
      if (error.response.status === 401) {
        signUpResponse(error.response.data.message);
        // Display the error message to the user
      } else {
        console.log("An error occurred:", error);
      }
    }
  }, []);

  return (
    <main>
      <header className={styles.header}>
        <div className={styles.logowrapper}>
          <Link href="/" className={styles.logotext} scroll={false}>
            CONCOR
          </Link>
        </div>
        <div className={styles.navwrapper}>
          <Link href="/" className={styles.navlinks} scroll={false}>
            Home
          </Link>
          <Link href="/login" className={styles.navlinks} scroll={false}>
            Log in
          </Link>

          <button
            type="button"
            onClick={() => router.push("/signup")}
            className={styles.signupbutton}
          >
            Create account{" "}
          </button>
        </div>
      </header>

      <div className={styles.formwrapper}>
        <h4 className={styles.registertitle}>Register</h4>
        <form className={styles.signupform}>
          <div className={styles.signupdetails}>
            <label>Username</label>
            <input
              ref={nameRef}
              className={styles.input}
              type="text"
              name="username"
            ></input>
          </div>
          <div className={styles.signupdetails}>
            <label>Email</label>
            <input
              ref={emailRef}
              className={styles.input}
              type="text"
              name="email"
            ></input>
          </div>
          <div className={styles.signupdetails}>
            <label>Password</label>
            <input
              ref={passwordRef}
              className={styles.input}
              type="text"
              name="password"
            ></input>
          </div>
          <div className={styles.submitdetails}>
            <button
              onClick={userSubmit}
              type="submit"
              className={styles.signupbutton}
            >
              Submit
            </button>
          </div>
          <p>{status}</p>
        </form>
      </div>
    </main>
  );
}
