export const particlesConfig = {
  background: {
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
  fullScreen: {
    zIndex: -1,
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "slow",
        parallax: {
          force: 60,
        },
      },
    },
    modes: {
      attract: {
        maxSpeed: 5,
      },
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      grab: {
        distance: 400,
      },
      repulse: {
        maxSpeed: 2,
      },
      slow: {
        radius: 100,
      },
    },
  },
  particles: {
    color: {
      value: "#687179",
    },
    links: {
      color: {
        value: "#687179",
      },
      distance: 150,
      enable: true,
      opacity: 0.4,
    },
    move: {
      attract: {
        rotate: {
          x: 600,
          y: 1200,
        },
      },
      enable: true,
      gravity: {
        maxSpeed: 5,
      },
      path: {},
      spin: {},
    },
    number: {
      density: {
        enable: true,
      },
      value: 50,
    },
    opacity: {
      value: 0.5,
      animation: {
        speed: 1,
        minimumValue: 0.1,
      },
    },
    size: {
      value: {
        min: 1,
        max: 5,
      },
      animation: {
        speed: 40,
        minimumValue: 0.1,
      },
    },
  },
};
