import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";

const MainDashboard = () => {
  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    role: "Project Manager",
    avatar: null,
  });

  // Mock subjects data
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Web Development", projects: 8, totalCost: 12500 },
    { id: 2, name: "Mobile Applications", projects: 5, totalCost: 9800 },
    { id: 3, name: "UI/UX Design", projects: 3, totalCost: 4500 },
    { id: 4, name: "Database Management", projects: 2, totalCost: 3200 },
  ]);

  // Mock projects data
  const [projects, setProjects] = useState([
    {
      id: 1,
      subjectId: 1,
      name: "E-commerce Website",
      acceptanceDate: "2025-01-15",
      deliveryDate: "2025-03-20",
      cost: 4800,
      isDone: true,
      isPaid: true,
    },
    {
      id: 2,
      subjectId: 1,
      name: "Corporate Portal",
      acceptanceDate: "2025-02-10",
      deliveryDate: "2025-04-15",
      cost: 3700,
      isDone: false,
      isPaid: true,
    },
    {
      id: 3,
      subjectId: 2,
      name: "iOS Fitness App",
      acceptanceDate: "2025-01-20",
      deliveryDate: "2025-03-10",
      cost: 5200,
      isDone: true,
      isPaid: false,
    },
    {
      id: 4,
      subjectId: 3,
      name: "Dashboard Redesign",
      acceptanceDate: "2025-02-25",
      deliveryDate: "2025-03-25",
      cost: 1800,
      isDone: false,
      isPaid: false,
    },
  ]);

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [particles, setParticles] = useState([]);

  // Select the first subject by default
  useEffect(() => {
    if (subjects.length > 0 && !selectedSubject) {
      setSelectedSubject(subjects[0]);
    }
  }, [subjects]);

  // Filter projects when subject changes
  useEffect(() => {
    if (selectedSubject) {
      setFilteredProjects(
        projects.filter((project) => project.subjectId === selectedSubject.id)
      );
    }
  }, [selectedSubject, projects]);

  // Generate particles for background effect (reused from login component)
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 10 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          speed: Math.random() * 0.5 + 0.2,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    // Animate particles
    const intervalId = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          y: particle.y > 100 ? 0 : particle.y + particle.speed,
        }))
      );
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  // Status template for DataTable
  const statusTemplate = (rowData, field) => {
    const value = rowData[field];
    return (
      <div className="status-icon">
        {value ? (
          <i className="status-check" />
        ) : (
          <i className="status-cross" />
        )}
      </div>
    );
  };

  // Format date for display
  const dateTemplate = (rowData, field) => {
    const dateString = rowData[field];
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format currency for display
  const currencyTemplate = (rowData, field) => {
    return `$${rowData[field].toLocaleString()}`;
  };

  return (
    <div className="dashboard-container">
      {/* Animated background */}
      <div className="animated-background">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
          ></div>
        ))}
      </div>

      <div className="dashboard-content">
        {/* Header with user info */}
        <header className="dashboard-header">
          <div className="brand-logo header-logo">
            <span className="logo-text-small">LPMS</span>
          </div>
          <div className="user-info">
            <div className="user-name">{userData.name}</div>
            <div className="user-role">{userData.role}</div>
            <div className="user-avatar">
              {userData.avatar ? (
                <img src={userData.avatar} alt={userData.name} />
              ) : (
                <div className="avatar-placeholder">
                  {userData.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="dashboard-main">
          {/* Subjects sidebar */}
          <aside className="subjects-sidebar">
            <h2 className="sidebar-title">My Subjects</h2>
            <ul className="subject-list">
              {subjects.map((subject) => (
                <li
                  key={subject.id}
                  className={`subject-item ${
                    selectedSubject && selectedSubject.id === subject.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setSelectedSubject(subject)}
                >
                  <span className="subject-name">{subject.name}</span>
                  <Badge value={subject.projects} className="subject-badge" />
                </li>
              ))}
            </ul>

            {/* Subject cost summary */}
            <div className="cost-summary">
              <h3 className="summary-title">Cost Summary</h3>
              {subjects.map((subject) => (
                <div key={subject.id} className="subject-cost">
                  <span className="cost-label">{subject.name}</span>
                  <span className="cost-value">
                    ${subject.totalCost.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="total-cost">
                <span className="cost-label">Total</span>
                <span className="cost-value">
                  $
                  {subjects
                    .reduce((sum, subject) => sum + subject.totalCost, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          </aside>

          {/* Main content area with projects */}
          <main className="main-content">
            {selectedSubject && (
              <>
                <div className="content-header">
                  <h1 className="subject-title">{selectedSubject.name}</h1>
                  <div className="subject-stats">
                    <div className="stat-item">
                      <span className="stat-value">
                        {selectedSubject.projects}
                      </span>
                      <span className="stat-label">Projects</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">
                        ${selectedSubject.totalCost.toLocaleString()}
                      </span>
                      <span className="stat-label">Total Value</span>
                    </div>
                  </div>
                </div>

                <Card className="projects-card">
                  <DataTable
                    value={filteredProjects}
                    responsiveLayout="scroll"
                    stripedRows
                    className="projects-table"
                  >
                    <Column
                      field="name"
                      header="Project Name"
                      className="project-name-column"
                    />
                    <Column
                      field="acceptanceDate"
                      header="Acceptance Date"
                      body={(rowData) =>
                        dateTemplate(rowData, "acceptanceDate")
                      }
                    />
                    <Column
                      field="deliveryDate"
                      header="Delivery Date"
                      body={(rowData) => dateTemplate(rowData, "deliveryDate")}
                    />
                    <Column
                      field="cost"
                      header="Cost"
                      body={(rowData) => currencyTemplate(rowData, "cost")}
                      className="cost-column"
                    />
                    <Column
                      field="isDone"
                      header="Completed"
                      body={(rowData) => statusTemplate(rowData, "isDone")}
                      className="status-column"
                    />
                    <Column
                      field="isPaid"
                      header="Paid"
                      body={(rowData) => statusTemplate(rowData, "isPaid")}
                      className="status-column"
                    />
                  </DataTable>
                </Card>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;