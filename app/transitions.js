export default function() {
  this.transition(
    this.includingInitialRender(),
    this.childOf('.nav-links'),
    this.use('navLinks'),
  );
}
