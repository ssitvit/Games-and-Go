export const gameInfoLeftVariants = {
  hidden: {
    opacity: 0,

    y: 200,
  },
  visible: {
    opacity: 1,

    y: 0,
    transition: { delay: 0.25, duration: 1 },
  },

  exit: {
    opacity: 0,
    y: 200,
    transition: { duration: 0.5 },
  },
};
export const boardVariants = {
  hidden: {
    opacity: 0,

    y: 200,
  },
  visible: {
    opacity: 1,

    y: 0,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    y: 200,
    transition: { duration: 0.5 },
  },
};

export const gameHeaderVariants = {
  hidden: {
    opacity: 0,

    y: -200,
  },
  visible: {
    opacity: 1,

    y: 0,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: { duration: 0.5 },
  },
};

export const playerInfoLeftVariants = {
  hidden: {
    opacity: 0,

    x: -200,
  },
  visible: {
    opacity: 1,

    x: 0,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    x: -200,
    transition: { duration: 0.5 },
  },
};

export const playerInfoRigthVariants = {
  hidden: {
    opacity: 0,

    x: 200,
  },
  visible: {
    opacity: 1,

    x: 0,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    x: 200,
    transition: { duration: 0.5 },
  },
};

export const footerVariants = {
  hidden: {
    opacity: 0,

    y: 200,
  },
  visible: {
    opacity: 1,

    y: 0,
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    y: 200,
    transition: { duration: 0.5 },
  },
};

export const wrapperVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: '20deg',
    x: 200,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    x: 0,
    transition: { duration: 1.5 },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    rotate: '-20deg',
    x: -200,
    transition: { duration: 1 },
  },
};

export const backdropVariants = {
  hidden: {
    opacity: 0,
    scaleY: 0,
  },
  visible: {
    opacity: 1,
    scaleY: [0.005, 0.005, 1],
    scaleX: [0, 1, 1],
    transition: { duration: 1 },
  },
  exit: {
    opacity: 0,
    scaleY: [1, 0.005, 0.005],
    scaleX: [1, 1, 0],
    transition: { duration: 1, delay: 0.3 },
  },
};

export const modalVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: { delay: 0.8, duration: 0.5 },
  },
  exit: {
    scale: 0,
    transition: { duration: 0.5 },
  },
};

export const whiteCircleVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: { delay: 0.3, duration: 0.5 },
  },
};

export const difficultyVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: { delay: 0.7, duration: 0.5 },
  },
};
