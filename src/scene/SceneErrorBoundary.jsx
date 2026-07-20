import { Component } from "react";

export default class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Non-fatal: log for debugging, keep the rest of the scene alive.
    console.warn("AETHERION: a scene element failed to load, skipping it.", error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}
