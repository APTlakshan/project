import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";


const UniqueLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Your actual login logic here
    }, 1500);
  };

  // Generate random particles for the background effect
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
          speed: Math.random() * 0.5 + 0.2
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    
    // Animate particles
    const intervalId = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          y: particle.y > 100 ? 0 : particle.y + particle.speed
        }))
      );
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="unique-login-container">
      {/* Animated background */}
      <div className="animated-background">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity
            }}
          ></div>
        ))}
      </div>
      
      {/* Login card with glass effect */}
      <div className="login-card">
        <div className="brand-section">
          <div className="brand-logo">
            <span className="logo-text">LPMS</span>
            <div className="logo-orbit">
              <div className="orbit-circle"></div>
            </div>
          </div>
          </div>
        
        <div className="login-section">
          <h1 className="login-title">Sign In</h1>
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <div className="icon-wrapper">
                <i className="icon user-icon"></i>
              </div>
              <InputText
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="custom-input"
              />
            </div>
            
            <div className="input-group">
              <div className="icon-wrapper">
                <i className="icon lock-icon"></i>
              </div>
              <Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                
                feedback={false}
                className="custom-password"
                inputClassName="custom-input"
              />
            </div>
            
            
            
            <Button
              type="submit"
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading || !username || !password}
            >
              {isLoading ? (
                <span className="loader"></span>
              ) : (
                "LOGIN"
              )}
            </Button>
          </form>
          
          <div className="separator">
            <span>or connect with</span>
          </div>
          
          <div className="social-buttons">
            <button className="social-btn google">
              <span className="social-icon google-icon"></span>
            </button>
            <button className="social-btn apple">
              <span className="social-icon apple-icon"></span>
            </button>
            <button className="social-btn microsoft">
              <span className="social-icon microsoft-icon"></span>
            </button>
          </div>
          
         
        </div>
      </div>
    </div>
  );
};

export default UniqueLogin;