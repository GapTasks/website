export const convertObjectToArray = (stacks) => Object.keys(stacks).filter(k=>k!="_links").map(k=>stacks[k])