import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.milestone', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        },
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  const milestones = [
    { year: '2020', title: 'Founded in Mumbai', desc: 'Started as a passion project in City Center Mall, Goregaon West' },
    { year: '2021', title: 'First 1000 Customers', desc: 'Word spread through social media and Google Maps' },
    { year: '2023', title: 'Premium Collections', desc: 'Expanded to imported leather, denim, and designer pieces' },
    { year: '2025', title: 'Digital Presence', desc: 'Launching our online experience' },
  ];

  return (
    <main className="relative z-10 bg-background">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img src="/frames/ezgif-frame-001.jpg" alt="About Zmarks" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-display-xl font-display text-white">Our Story</h1>
        </div>
      </section>

      {/* Brand Intro */}
      <section className="container-narrow section-padding text-center">
        <p className="text-2xl lg:text-3xl font-display leading-relaxed text-text-primary">
          Zmarks was born from a simple belief — that luxury fashion should be accessible to everyone.
        </p>
      </section>

      {/* Timeline */}
      <section className="container-narrow section-padding-sm" ref={timelineRef}>
        <h2 className="text-display-sm font-display text-center mb-16">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 w-px bg-border-light h-full transform md:-translate-x-1/2" />
          <div className="space-y-16">
            {milestones.map((m, i) => (
              <div key={m.year} className={`milestone relative flex ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}>
                <div className="md:w-1/2" />
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 mt-1.5" />
                <div className="w-full pl-12 md:pl-0 md:w-1/2 md:px-12">
                  <div className={i % 2 === 0 ? 'md:text-left' : 'md:text-right'}>
                    <h3 className="text-display-sm font-display text-primary">{m.year}</h3>
                    <h4 className="text-lg font-medium mt-2">{m.title}</h4>
                    <p className="text-body-sm text-text-secondary mt-2">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container-luxury section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] bg-surface">
            <img src="/frames/ezgif-frame-120.jpg" alt="Mission" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-display-sm font-display mb-6">Our Mission</h2>
            <p className="text-body-md text-text-secondary">
              We are dedicated to bringing high-quality, imported fashion to our community. Every piece is carefully selected to ensure you get the best styles without compromising on material or design.
            </p>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="container-narrow section-padding-sm text-center">
        <h2 className="text-display-md font-display text-text-primary">Where luxury meets accessibility.</h2>
      </section>

      {/* Values */}
      <section className="container-luxury section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <span className="text-caption text-text-muted">01</span>
            <h3 className="text-xl font-display mt-4 mb-2">Quality</h3>
            <p className="text-body-sm text-text-secondary">We source only the finest materials for our clothing.</p>
          </div>
          <div>
            <span className="text-caption text-text-muted">02</span>
            <h3 className="text-xl font-display mt-4 mb-2">Authenticity</h3>
            <p className="text-body-sm text-text-secondary">Genuine imported pieces that stand out.</p>
          </div>
          <div>
            <span className="text-caption text-text-muted">03</span>
            <h3 className="text-xl font-display mt-4 mb-2">Value</h3>
            <p className="text-body-sm text-text-secondary">Luxury styles at accessible price points.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center section-padding bg-surface">
        <Button href="/contact" size="lg">Visit Our Store</Button>
        <p className="mt-4 text-text-secondary text-sm">Shop 227, City Center Mall, Goregaon West</p>
      </section>
    </main>
  );
};

export default About;
