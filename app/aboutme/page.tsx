import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AboutMePage() {
  return (
    <DashboardLayout>
      <div className="bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 min-h-screen px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            About Me
          </h1>

          {/* Personal Background */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">
              👶 Personal Background
            </h2>
            <p className="text-lg leading-relaxed">
              I was born on <strong>25th October 1994</strong> in{" "}
              <strong>Nagercoil</strong>, a small but beautiful town in
              Kanyakumari, Tamil Nadu. From an early age, I was hooked on how
              things worked — games, code, or cricket strategies. That curiosity
              led me into tech, and I've been obsessed ever since.
            </p>
          </section>

          {/* Professional Summary */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">
              💻 Who I Am Professionally
            </h2>
            <p className="text-lg leading-relaxed">
              I'm a software developer with a strong focus on{" "}
              <strong>clean design</strong>, <strong>solid architecture</strong>
              , and
              <strong> meaningful user experiences</strong>. I enjoy building
              scalable systems and working with modern technologies across the
              stack.
            </p>
          </section>

          {/* Philosophy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">🧠 What Drives Me</h2>
            <p className="text-lg leading-relaxed">
              I believe in <strong>sharp code</strong>,{" "}
              <strong>honest feedback</strong>, and{" "}
              <strong>tools that stay out of the way</strong>. If something’s
              bloated or overcomplicated, I’ll probably rebuild it cleaner.
            </p>
          </section>

          {/* Fun Facts */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">🎮 Fun Facts</h2>
            <ul className="list-disc list-inside text-lg leading-relaxed space-y-2">
              <li>
                I love competitive video games, especially strategy and sci-fi
                genres.
              </li>
              <li>
                I'm obsessed with South Indian chicken or fish curry — best
                comfort food ever.
              </li>
              <li>
                Recently visited Paris — nothing sparks ideas like a solo trip.
              </li>
              <li>
                Played cricket until I was 18 — I was even the captain of my
                team.
              </li>
              <li>
                I prefer long walks at night — that’s when the best ideas hit
                me.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
