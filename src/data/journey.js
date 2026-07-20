// Five checkpoints along the flythrough. `progress` is where in the 0-1
// scroll range this checkpoint sits. Camera position/lookAt are sampled
// along a spline through these points, so keep them spatially sensible.

export const CHECKPOINTS = [
  {
    id: "arrival",
    progress: 0,
    camera: [0, 1.2, 9],
    lookAt: [0, 0.6, 0],
    eyebrow: "I.",
    title: "AETHERION",
    body: "Somewhere past the last mapped sky, magic and machine gave up pretending to be different things. Scroll down — it doesn't get less strange from here.",
  },
  {
    id: "citadel",
    progress: 0.26,
    camera: [-4.2, 2.4, 3.5],
    lookAt: [-1.5, 1, -1],
    eyebrow: "II.",
    title: "The Citadel",
    body: "Nobody designed these spires. Someone found a way to seed cracked stone with current and just let it grow for four hundred years.",
  },
  {
    id: "bridges",
    progress: 0.52,
    camera: [2.6, 0.4, -1.5],
    lookAt: [0, 0.6, -3],
    eyebrow: "III.",
    title: "The Bridgeways",
    body: "Cut one of these and the islands on either end start drifting apart within the hour. Nobody's tested exactly how long 'connected' needs to mean.",
  },
  {
    id: "core",
    progress: 0.76,
    camera: [0, 0.6, 3.2],
    lookAt: [0, 0.4, 0],
    eyebrow: "IV.",
    title: "The Heartstone",
    body: "Every keeper's log says the same thing about the light in the center, in slightly different words: it was already awake when they got here. Go ahead, touch it.",
  },
  {
    id: "close",
    progress: 1,
    camera: [0, 5.5, 12],
    lookAt: [0, 0.5, 0],
    eyebrow: "V.",
    title: "Your Turn",
    body: "Built for the 3D Websites Hackathon over a slightly unreasonable number of late nights. Thanks for scrolling all the way down.",
  },
];

export const CAMERA_POINTS = CHECKPOINTS.map((c) => c.camera);
export const LOOKAT_POINTS = CHECKPOINTS.map((c) => c.lookAt);
