import type { Project } from "@/components/ProjectCard";
import { liveMedia, localMedia } from "@/lib/media";

const local = (n: string) => localMedia(n);
const live = (n: string) => liveMedia(n);

export const PROJECTS: Project[] = [
  {
    id: "commercial-build",
    title: "Commercial Buildout",
    category: "Commercial",
    blurb:
      "Multi-phase commercial site work and structural concrete with full project management.",
    cover: local("commercial_1.jpeg"),
    images: [
      local("commercial_1.jpeg"),
      local("commercial_2.jpeg"),
      local("commercial_3.jpeg"),
      local("commercial_4.jpeg"),
      local("commercial_5.jpeg"),
      local("commercial_6.jpeg"),
    ],
  },
  {
    id: "residential-renovation",
    title: "Residential Renovation",
    category: "Residential",
    blurb:
      "Full-scope home renovation including interior remodel, hardscape, and outdoor living.",
    cover: local("residential_1.jpeg"),
    images: [
      local("residential_1.jpeg"),
      local("residential_2.jpeg"),
      local("residential_3.jpeg"),
      local("residential_4.jpeg"),
      local("residential_5.jpeg"),
      local("residential_6.jpeg"),
      local("residential_7.jpeg"),
    ],
  },
  {
    id: "custom-fencing",
    title: "Custom Fencing",
    category: "Fencing",
    blurb:
      "Premium wood fencing systems engineered for longevity and aesthetic appeal.",
    cover: local("fence_1.jpeg"),
    images: [local("fence_1.jpeg"), local("fence_2.jpeg"), local("fence_3.jpeg")],
  },
  {
    id: "red-fence-install",
    title: "Designer Fence Install",
    category: "Fencing",
    blurb:
      "Statement perimeter fencing combining red-tone wood and steel detailing.",
    cover: local("redFence_1.jpeg"),
    images: [
      local("redFence_1.jpeg"),
      local("redFence_2.jpeg"),
      local("redFence_3.jpeg"),
      local("redFence_4.jpeg"),
      local("redFence_5.jpeg"),
    ],
  },
  {
    id: "showcase-portfolio",
    title: "Project Portfolio",
    category: "Featured",
    blurb:
      "Highlights from active job sites — concrete, hardscape, and finished installations.",
    cover: live("live-1.png"),
    images: [
      live("live-1.png"),
      live("live-2.jpeg"),
      live("live-3.jpeg"),
      live("live-4.jpg"),
      live("live-5.jpg"),
      live("live-6.jpg"),
      live("live-7.jpg"),
      live("live-8.jpg"),
      live("live-9.jpg"),
      live("live-10.jpg"),
      live("live-11.jpeg"),
      live("live-12.png"),
    ],
  },
  {
    id: "concrete-hardscape",
    title: "Concrete & Hardscape",
    category: "Concrete",
    blurb:
      "Driveways, patios, and decorative concrete with detail-driven finish work.",
    cover: live("live-4.jpg"),
    images: [
      live("live-4.jpg"),
      live("live-5.jpg"),
      live("live-6.jpg"),
      live("live-7.jpg"),
      live("live-8.jpg"),
    ],
  },
];
