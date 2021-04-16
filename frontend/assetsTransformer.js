module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest",
      "\\.(jpg|jpeg|png|gif|eot|otf)$": "<rootDir>/assetsTransformer.js",
      "\\.(webp|svg|ttf|woff|woff2|mp4|webm)$": "<rootDir>/assetsTransformer.js",
      "\\.(wav|mp3|m4a|aac|oga)$": "<rootDir>/assetsTransformer.js"

    },
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "setupFilesAfterEnv": ["<rootDir>/src/setupEnzyme.ts"],
}