"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  const router = useRouter();
  const [articles, fetchArticles] = useState("");

  // fetch data from backend using axios

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/articles/listarticles"
        );
        console.log(response.data);
        fetchArticles(response.data);
      } catch (error) {
        console.error("Axios error:", error);
        // res.setCode(401).json(error);
      }
    };
    fetchData();
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
            className={styles.createaccountbutton}
          >
            Create account{" "}
          </button>
        </div>
      </header>

      <div className={styles.outerwrapper}>
        <div className={styles.articleswrapper}>
          {articles ? (
            articles.map((elm) => {
              return (
                <>
                  <div className={styles.articleBox}>
                    <article>
                      <div>
                        <img
                          className={styles.authorImage}
                          src={elm.author.imageUrl}
                          alt="Profile Image"
                        />
                        <p>{elm.author.username}</p>
                        <p>{elm.title}</p>
                      </div>
                      <div>
                        <p>{elm.body}</p>
                      </div>
                      <div>
                        <p>tags</p>
                      </div>
                      <div>
                        <p>likes /comments</p>
                      </div>
                    </article>
                  </div>
                </>
              );
            })
          ) : (
            <>
              <p>loading...</p>
            </>
          )}
        </div>
        <div className={styles.populartagscontainer}>
          <aside>
            <h1>#discuss</h1>
            <p>Discussion threads targeting the whole community</p>
            {/* change as per content dynamic */}
            <div>
              <h3>Topic</h3>
              <div>
                <span>1</span>comments
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
