import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://api.github.com/users/Chaitanya-963",
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGithubData();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
        }}
      >
        Failed to load data.
      </div>
    );
  }

  return (
    <div
      style={{
        // display: "flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          border: "1px solid #FFD700",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(255, 215, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={data.avatar_url}
            alt="Avatar"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "2px solid #FFD700",
              marginRight: "20px",
            }}
          />
          <div>
            <h1 style={{ margin: "0", fontSize: "24px", color: "#FFD700" }}>
              {data.name}
            </h1>
            <p style={{ margin: "5px 0", color: "#cccccc" }}>@{data.login}</p>
          </div>
        </div>
        {data.bio && (
          <p style={{ marginBottom: "20px", lineHeight: "1.5" }}>{data.bio}</p>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
          }}
        >
          <div>
            <div
              style={{ fontSize: "18px", fontWeight: "bold", color: "#FFD700" }}
            >
              {data.followers}
            </div>
            <div style={{ color: "#cccccc" }}>Followers</div>
          </div>
          <div>
            <div
              style={{ fontSize: "18px", fontWeight: "bold", color: "#FFD700" }}
            >
              {data.following}
            </div>
            <div style={{ color: "#cccccc" }}>Following</div>
          </div>
          <div>
            <div
              style={{ fontSize: "18px", fontWeight: "bold", color: "#FFD700" }}
            >
              {data.public_repos}
            </div>
            <div style={{ color: "#cccccc" }}>Repos</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
