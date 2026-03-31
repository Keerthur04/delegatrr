/* =============================================================
   Landing — Signal Design: Dark hero with teal network bg
   ============================================================= */

import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Users, Brain, CheckSquare, BarChart3, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663496303278/JBzhyXfSZCqbH5rEzZaybF/delegatr-hero-bg-RzGfH9XrD3RbjuFrGbhMNt.webp";
const AI_PARSING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663496303278/JBzhyXfSZCqbH5rEzZaybF/delegatr-ai-parsing-f69dtQXk6kV6S2R6oRpJZs.webp";
const TEAM_NETWORK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663496303278/JBzhyXfSZCqbH5rEzZaybF/delegatr-team-network-iPjUoymGUZxKB4UA557wy4.webp";

const FEATURES = [
  {
    icon: Brain,
    title: "AI Profile Parsing",
    desc: "Drop in resumes and GitHub profiles. Our AI extracts skills, experience, and strengths automatically.",
  },
  {
    icon: Users,
    title: "Smart Role Assignment",
    desc: "AI matches each team member to the right subtask based on their unique skill fingerprint.",
  },
  {
    icon: BarChart3,
    title: "Live Progress Dashboard",
    desc: "Managers see real-time completion rates, bottlenecks, and team velocity at a glance.",
  },
  {
    icon: CheckSquare,
    title: "Employee Checklists",
    desc: "Each team member gets a personal checklist. Check off tasks to update the dashboard instantly.",
  },
];

const STEPS = [
  { num: "01", title: "Define the Task", desc: "Describe what needs to be done, set a deadline, and add context." },
  { num: "02", title: "Add Your Team", desc: "Upload resumes and GitHub usernames. AI does the reading for you." },
  { num: "03", title: "AI Assigns Roles", desc: "Watch the AI match each person to their optimal subtask in seconds." },
  { num: "04", title: "Track Progress", desc: "Team checks off work. Dashboard updates live. You stay in control." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/15 border border-primary/30">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span className="text-foreground font-semibold text-base tracking-tight">Delegatr</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/app/dashboard">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Button>
            </Link>
            <Link href="/app/new-task">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5">
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mono mb-8">
              <Zap className="w-3 h-3" />
              AI-Powered Delegation
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]">
              Stop guessing who
              <br />
              <span className="text-primary">should do what.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Drop in a task, your team's resumes, and GitHub profiles.
              Delegatr's AI reads everything, assigns the right people,
              and keeps everyone on track.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/app/new-task">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8 h-12 text-base font-semibold">
                  Start Delegating <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/app/dashboard">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary gap-2 px-8 h-12 text-base">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { val: "< 30s", label: "AI assignment time" },
              { val: "100%", label: "Skill-matched roles" },
              { val: "Live", label: "Progress tracking" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary mono">{stat.val}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-primary/50" />
        </div>
      </section>

      {/* How it works */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-primary text-sm font-medium mono mb-3">HOW IT WORKS</p>
            <h2 className="text-4xl font-bold text-foreground tracking-tight">Four steps to perfect delegation</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 group hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="mono text-4xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors leading-none">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-foreground font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary text-sm font-medium mono mb-3">AI PARSING ENGINE</p>
              <h2 className="text-4xl font-bold text-foreground tracking-tight mb-5">
                Reads resumes.<br />Understands GitHub.<br />Knows your team.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our AI doesn't just scan keywords — it understands context. It reads through
                experience descriptions, analyzes commit histories, and builds a complete
                skill profile for each team member.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "Python", "ML/AI", "DevOps", "System Design", "Leadership"].map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-border"
            >
              <img src={AI_PARSING} alt="AI Parsing" className="w-full h-64 object-cover" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-border order-2 lg:order-1"
            >
              <img src={TEAM_NETWORK} alt="Team Network" className="w-full h-64 object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="text-primary text-sm font-medium mono mb-3">SMART MATCHING</p>
              <h2 className="text-4xl font-bold text-foreground tracking-tight mb-5">
                Right person,<br />right task,<br />every time.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Delegatr scores each team member against every subtask and assigns
                based on skill match, availability, and workload balance. No more
                guesswork, no more bottlenecks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-foreground tracking-tight mb-4">Everything you need</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From task creation to completion tracking — one unified workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-5 hover:border-primary/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-foreground font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-foreground tracking-tight mb-5">
              Ready to delegate smarter?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Set up your first delegated task in under two minutes.
            </p>
            <Link href="/app/new-task">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-10 h-14 text-lg font-semibold">
                Start Now <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground text-sm">Delegatr</span>
          </div>
          <p className="text-muted-foreground text-xs mono">AI-Powered Task Delegation</p>
        </div>
      </footer>
    </div>
  );
}
