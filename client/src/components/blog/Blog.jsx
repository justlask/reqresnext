import React, { Component } from 'react'

export default class Blog extends Component {
  render() {
    return (
      <main style={{padding: '50px 0', width: '100vw', display: 'flex', flexDirection: 'column',  justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'left', width: '70vw', minHeight: '60vh', textAlign: 'left'}}>
          <h1 style={{fontWeight: 500, paddingBottom: '10px'}}>Why ReqResNext?</h1>
          <p style={{paddingBottom: '25px'}}>Well, when I was beginning another solo project I realized that there was no project management tool
            that was highly geared to a team of one, or even to a team of a few. Most large teams use not only one tool, but many.
            And that's great, but for a small project, it can become too much to keep track of - I wanted something simple.
          </p>
          <h2 style={{fontWeight: 500}}>An Ode to Express</h2>
          <p style={{paddingBottom: '25px'}}>So what is a dev to do? The answer is to create it, and name it the nerdiest thing you can think of! If you're familiar
            with Express.js, you've probably written (req, res, next) or some similar variation more times than you'd care
            to count. And magically, (I mean really magically) no one had thought to buy the domain?<br></br> SCORE.
          </p>
          <h2 style={{fontWeight: 500}}>The Process: Design</h2>
          <p style={{paddingBottom: '25px'}}>I'm a dev, not a designer, but I'd like to believe that I have a general idea
          of what looks decent and what doesn't. I like to take the time to do some (very) Lo Fidelity mockups before I start any project.
          I find that it helps me organize information, giving me a general idea of what I'm building and how all the parts 
          should work together. And while that has made my previous projects look a little bit better, this time I wanted to make
          a very polished project. So, I started with a two day design sprint using Adobe XD.
          <br></br><br></br>
          This was what my prototype looked like
          once I was finished and ready to begin coding.
          <iframe width="560" height="315" src="https://www.youtube.com/embed/7rl3PZjaHfg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <br></br>
          </p>
          <h2 style={{fontWeight: 500}}>The Process: Development</h2>
          <p style={{paddingBottom: '25px'}}>
            6 CRUDs (almost, eventually) and 11 component folders. I've been developing this project for 8 days according to GitHub, although I took 2 of those days off for New Years. 
            <span style={{fontWeight: 600}}> Hello, 2020!</span> I'm happy with the progress I've made in 6 days of development, and can't wait to see what this project will look like
            in another week. My prototype had 6(?) screens, that's easy, no problem! It wasn't until day 4 that I realized just how involved 
            those screens were. But thankfully, keeping components organized in their own folders really helped keep the project organized, and
            knowing (almost) exactly what I was building and how the pieces would work together really helped speed up development. That's
            one of the reasons this project is so visual, placing the "wireframe" or "mockup" directly next to the tasks needed to complete it.
             I'd highly recommend taking the time out to design your project, both the user interface and information architecture before jumping into coding.
            <br></br><br></br>
            <span style={{fontWeight: 600}}>It reminds me of the old saying: measure twice, cut once. Design twice and code once.</span><br></br>
            Instead of coding first, and then trying to figure out how things should look and work together to provide a good experience.
          </p>
          <h2 style={{fontWeight: 500}}>The Process: Design (Part 2)</h2>
          <p style={{paddingBottom: '25px'}}>
            That said, I'm a dev, not a designer. And although I sometimes like to pretend that I'm a designer 😅, you've got to know
            when to get input from an actual designer. User Interface and User Experience Design can make or break an idea, a business,
            or a product. And sometimes as devs, we focus on the functionality of making it work instead of the functionality of <b>how </b>
            it will function when other humans use it. Especially when those humans didn't develop it, and don't know how "we" think
            it should work. Sometimes the end user has a completely different idea of <b>how </b> to use what we've made. 
            <br></br><br></br>
            I am grateful for all UX/UI Designers for what they do, however, I am most grateful for <a style={{textDecoration: 'none', color: '#2d3d8b', fontWeight: 500}}target="_blank" href="http://www.nicolematos.design"> Nicole Matos</a>,
            who tried to steer me in the right direction when trying to style and polish this project. This project would not look as good
            without her keen attention to detail. She really helped me craft this project into something special. Thank you for answering
            my endless questions, and for giving me your thoughts, input, and notes on what worked and what needed to be re-tooled. 
            I'll have to admit that sometimes actual "bold" is too bold, and a font weight of 500/600 can be better 😉.
            <br></br><br></br>
            There's still a lot of work to do, but here is current state of ReqResNext with help from <a style={{textDecoration: 'none', color: '#2d3d8b', fontWeight: 500}}target="_blank" href="http://www.nicolematos.design"> Nicole Matos</a> 🙌.
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ju-Pi-j0Y2A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <br></br> 
          </p>

          
          <h2 style={{fontWeight: 500}}>The Future</h2>
          <p style={{paddingBottom: '25px'}}>
            Take ReqResNext out for a spin!<br></br>
            This MVP is usable, but definitely is not 100% complete! There are some features that are not included in this release, but more will be added soon, (today... tomorrow... the next day).
            <br></br>
            Drop me a line in the contact form (you can find a link in the footer) and let me know what you think!
          </p>
          <h3>Happy Coding and High Fives,</h3>
          <h4>Lauren Laskerr</h4>
          <sub>Software Engineer @ ReqResNext.com</sub>
          <sub>PPS: Use our contact form, it's AWESOME, trust me.</sub>
        </div>
      </main>
    )
  }
}
