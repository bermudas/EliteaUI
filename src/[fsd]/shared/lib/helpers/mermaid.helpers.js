let instance = null;

export const getMermaid = async () => {
  if (!instance) {
    const m = await import('mermaid');
    instance = m.default;
  }
  return instance;
};
