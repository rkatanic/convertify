export const particlesConfig = {
    background: {
      color: {
        value: "#ffffff",
      },
      image: "url('https://particles.js.org/images/background3.jpg')",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover",
    },
    backgroundMask: {
      enable: true,
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "bubble",
          parallax: {
            force: 60,
          },
        },
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 1,
          size: 200,
        },
        grab: {
          distance: 400,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: {
          value: "#ffffff",
        },
        distance: 150,
        enable: true,
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        enable: true,
      },
      number: {
        density: {
          enable: true,
        },
        value: 35,
      },
      opacity: {
        animation: {
          speed: 1,
          minimumValue: 0.1,
        },
      },
      size: {
        value: {
          min: 1,
          max: 100,
        },
        animation: {
          speed: 40,
          minimumValue: 0.1,
        },
      },
    },
  }