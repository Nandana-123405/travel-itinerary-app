import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaImage,
  FaTrash,
} from "react-icons/fa";
import api from "../services/api";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];

    if (!selectedFile) return;

    // FILE SIZE VALIDATION
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    // FILE TYPE VALIDATION
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only PDF, JPG and PNG files are allowed");
      return;
    }

    setFile(selectedFile);
    setError("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
      },
      maxFiles: 1,
    });

  // HANDLE UPLOAD
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    setLoading(true);
    setError("");
    setUploadProgress(0);

    try {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }

          return prev + 10;
        });
      }, 250);

      const response = await api.post(
        "/itinerary/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
          timeout: 60000,
        }
      );

      clearInterval(interval);

      setUploadProgress(100);

      setTimeout(() => {
        navigate(
          `/itinerary/${response.data.itinerary.id}`
        );
      }, 1000);
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Upload failed. Please try again."
      );

      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setError("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          {/* HEADER */}
          <div style={styles.header}>
            <div style={styles.icon}>
              <FaCloudUploadAlt />
            </div>

            <h1 style={styles.title}>
              Upload Travel Document
            </h1>

            <p style={styles.subtitle}>
              Upload flight tickets, hotel bookings
              or travel documents to generate your AI
              itinerary
            </p>
          </div>

          {/* DROPZONE */}
          <div
            {...getRootProps()}
            style={{
              ...styles.dropzone,
              ...(isDragActive
                ? styles.dropzoneActive
                : {}),
            }}
          >
            <input {...getInputProps()} />

            {file ? (
              <div style={styles.fileInfo}>
                <div style={styles.fileLeft}>
                  {file.type ===
                  "application/pdf" ? (
                    <FaFilePdf
                      style={styles.fileIcon}
                    />
                  ) : (
                    <FaImage
                      style={styles.fileIcon}
                    />
                  )}

                  <div>
                    <p style={styles.fileName}>
                      {file.name}
                    </p>

                    <p style={styles.fileSize}>
                      {(
                        file.size /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB
                    </p>
                  </div>
                </div>

                <button
                  style={styles.removeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            ) : (
              <div style={styles.dropContent}>
                <FaCloudUploadAlt
                  style={styles.uploadIcon}
                />

                <h3>
                  {isDragActive
                    ? "Drop your file here"
                    : "Drag & Drop your file"}
                </h3>

                <p style={styles.browseText}>
                  or click to browse
                </p>

                <p style={styles.supported}>
                  Supported: PDF, JPG, PNG
                </p>

                <p style={styles.supported}>
                  Maximum Size: 5MB
                </p>
              </div>
            )}
          </div>

          {/* ERROR */}
          {error && (
            <div style={styles.error}>
              ⚠️ {error}
            </div>
          )}

          {/* PROGRESS */}
          {uploadProgress > 0 &&
            uploadProgress < 100 && (
              <div style={styles.progressWrapper}>
                <div style={styles.progressBarBg}>
                  <div
                    style={{
                      ...styles.progressBar,
                      width: `${uploadProgress}%`,
                    }}
                  />
                </div>

                <p style={styles.progressText}>
                  Processing... {uploadProgress}%
                </p>
              </div>
            )}

          {/* SUCCESS */}
          {uploadProgress === 100 && (
            <div style={styles.success}>
              ✅ Upload successful! Generating AI
              itinerary...
            </div>
          )}

          {/* BUTTON */}
          <button
            style={{
              ...styles.button,
              ...(loading || !file
                ? styles.disabledButton
                : {}),
            }}
            disabled={loading || !file}
            onClick={handleUpload}
          >
            {loading
              ? "Generating Itinerary..."
              : "Generate AI Itinerary ✈️"}
          </button>

          {/* TIPS */}
          <div style={styles.tips}>
            <h4>💡 Tips for Best Results</h4>

            <ul>
              <li>
                Upload clear travel booking documents
              </li>
              <li>
                Ensure dates and destination names are
                visible
              </li>
              <li>
                High quality images improve AI accuracy
              </li>
            </ul>
          </div>

          {/* BACK */}
          <Link to="/dashboard" style={styles.back}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundImage:
      'url("https://images.unsplash.com/photo-1502920917128-1aa500764ce7?q=80&w=1600&auto=format&fit=crop")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    minHeight: "100vh",
    background: "rgba(0,0,0,0.65)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "650px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(16px)",
    borderRadius: "25px",
    padding: "35px",
    color: "white",
    boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
    animation: "fadeIn 0.6s ease",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  icon: {
    fontSize: "3.5rem",
    marginBottom: "10px",
    color: "#00c6ff",
  },

  title: {
    fontSize: "2rem",
    marginBottom: "10px",
    fontWeight: "700",
  },

  subtitle: {
    color: "rgba(255,255,255,0.8)",
    lineHeight: "1.6",
    fontSize: "0.95rem",
  },

  dropzone: {
    border: "2px dashed rgba(255,255,255,0.4)",
    borderRadius: "20px",
    padding: "40px 25px",
    cursor: "pointer",
    transition: "0.3s",
    background: "rgba(255,255,255,0.08)",
  },

  dropzoneActive: {
    borderColor: "#00c6ff",
    background: "rgba(0,198,255,0.15)",
  },

  dropContent: {
    textAlign: "center",
  },

  uploadIcon: {
    fontSize: "4rem",
    marginBottom: "15px",
    color: "#00c6ff",
  },

  browseText: {
    marginTop: "10px",
    color: "#d1d5db",
  },

  supported: {
    fontSize: "0.85rem",
    color: "#9ca3af",
    marginTop: "5px",
  },

  fileInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
  },

  fileLeft: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  fileIcon: {
    fontSize: "2.5rem",
    color: "#ff4d4f",
  },

  fileName: {
    fontWeight: "600",
    fontSize: "1rem",
  },

  fileSize: {
    fontSize: "0.85rem",
    color: "#d1d5db",
    marginTop: "5px",
  },

  removeButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    background: "#ff4d4f",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
  },

  error: {
    background: "rgba(255,0,0,0.18)",
    border: "1px solid rgba(255,0,0,0.3)",
    color: "#ffb3b3",
    padding: "14px",
    borderRadius: "12px",
    marginTop: "20px",
    textAlign: "center",
  },

  success: {
    background: "rgba(0,255,100,0.15)",
    border: "1px solid rgba(0,255,100,0.3)",
    color: "#b7ffcb",
    padding: "14px",
    borderRadius: "12px",
    marginTop: "20px",
    textAlign: "center",
  },

  progressWrapper: {
    marginTop: "20px",
  },

  progressBarBg: {
    width: "100%",
    height: "10px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    background:
      "linear-gradient(135deg,#00c6ff,#0072ff)",
    transition: "0.3s",
  },

  progressText: {
    marginTop: "8px",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#d1d5db",
  },

  button: {
    width: "100%",
    marginTop: "25px",
    padding: "15px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg,#00c6ff,#0072ff)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 10px 25px rgba(0,114,255,0.4)",
  },

  disabledButton: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  tips: {
    marginTop: "30px",
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "16px",
  },

  back: {
    display: "block",
    textAlign: "center",
    marginTop: "25px",
    color: "#00c6ff",
    textDecoration: "none",
    fontWeight: "600",
  },
};

// GLOBAL CSS
const styleSheet = document.createElement("style");

styleSheet.textContent = `
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
  }

  button:hover{
    transform:translateY(-3px);
    opacity:0.95;
  }

  @keyframes fadeIn{
    from{
      opacity:0;
      transform:translateY(20px);
    }
    to{
      opacity:1;
      transform:translateY(0);
    }
  }
`;

document.head.appendChild(styleSheet);

export default Upload;