export default function() {
  this.transition(
    this.includingInitialRender(),
    this.childOf('.nav-links'),
    this.use('navLinks'),
  );

  this.transition(
    this.childOf('.race-group__races'),
    this.use('grow'),
  )
}
