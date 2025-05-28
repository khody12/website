import react from 'react';

export default function AboutPage() {
    return (
    // container is a tailwind component class, centers itself and sets max width which changes at diff screen size break points
    // mx-auto applies a margin-left:auto and margin-right:auto
    // px-4 => p for padding, x for x axis, 4 is tailwind spacing scale = 1rem/16px.
    // py-8 => p for padding, y for y-axis, 8 = 2rem/32px.
    //mb-6 => m for margin, b for bottom, 6 is spacing scale again = 1.5rem.
    <div className="container mx-auto px-4 py-8 text-center"> {/* Added text-center */}
      <h1 className="text-4xl font-bold mb-6 text-white">About Me</h1>
      <p className="text-lg text-neutral-300">
        This is where I'll share more about my journey, passions, and what drives me as a developer.
        Stay tuned for more details!
      </p>
    </div>
        
    )
}