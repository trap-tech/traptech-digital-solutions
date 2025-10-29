import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ServiceCard } from "@/components/ServiceCard";
import { Monitor, Shield, Globe, FileText, Play, Download } from "lucide-react";
import heroImage from "@/assets/hero-tech.jpg";

const Index = () => {
  const services = [
    {
      icon: Monitor,
      title: "Windows Installation",
      description: "Professional Windows OS installation and setup for optimal performance. Get your system running smoothly with expert configuration.",
    },
    {
      icon: Play,
      title: "Media Players",
      description: "Install and configure the best media players for seamless audio and video playback. Enjoy your multimedia content without hassle.",
    },
    {
      icon: Shield,
      title: "Antivirus Programs",
      description: "Comprehensive antivirus solutions to protect your system from threats. Keep your data safe with industry-leading security software.",
    },
    {
      icon: Globe,
      title: "Web Browsers",
      description: "Install and optimize modern web browsers for fast, secure internet browsing. Experience the web at its best.",
    },
    {
      icon: FileText,
      title: "Microsoft Office",
      description: "Complete Microsoft Office suite installation and setup. Boost your productivity with Word, Excel, PowerPoint, and more.",
    },
    {
      icon: Download,
      title: "Software Solutions",
      description: "Custom software installation tailored to your needs. From productivity tools to specialized applications.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Trap Tech
            </h1>
            <div className="flex gap-6">
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                Services
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Professional Software Solutions
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Expert software installation and configuration services for computers and laptops. Your trusted partner for all Windows software needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="#services">Explore Services</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive software solutions designed to keep your system running at peak performance
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Trap Tech</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Trap Tech specializes in providing professional software solutions for computers and laptops. With years of experience in the tech industry, we understand the importance of having the right software configured correctly.
              </p>
              <p>
                Whether you need a fresh Windows installation, essential productivity software, or comprehensive security solutions, our team ensures every installation is performed with precision and care. We take pride in delivering services that maximize your system's performance and reliability.
              </p>
              <p>
                From individual users to small businesses, we provide tailored software solutions that meet your specific needs. Our expertise spans across all major Windows applications, ensuring you have the tools you need to succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Get in Touch</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Ready to optimize your system with professional software solutions? Contact us today to discuss your needs.
            </p>
            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <div className="space-y-4 text-lg">
                <div>
                  <p className="font-semibold text-primary mb-2">Email</p>
                  <a href="mailto:info@traptech.com" className="text-muted-foreground hover:text-primary transition-colors">
                    info@traptech.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-2">Phone</p>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="pt-4">
                  <Button variant="hero" size="lg" asChild>
                    <a href="mailto:info@traptech.com">Send Message</a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">© 2024 Trap Tech. All rights reserved.</p>
            <p className="text-sm mt-2">Professional Software Solutions for Computers & Laptops</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
