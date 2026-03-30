<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HeroSlide;
use App\Models\Service;
use App\Models\Partner;
use App\Models\Project;
use App\Models\TeamMember;
use App\Models\BlogPost;
use App\Models\ContentSetting;
use App\Models\Testimonial;
use Illuminate\Support\Str;

class AlliedEnergySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->seedHeroSlides();
        $this->seedServices();
        $this->seedPartners();
        $this->seedProjects();
        $this->seedTeamMembers();
        $this->seedBlogPosts();
        $this->seedContentSettings();
        $this->seedSiteSettings();
        $this->seedTestimonials();
    }

    private function seedHeroSlides(): void
    {
        $slides = [
            [
                'title' => "Harnessing the Power of Waves for a Cleaner Tomorrow",
                'subtitle' => "Renewable Energy IPP",
                'description' => "Allied Energies Ltd is pioneering the future of clean power — converting the force of ocean waves into dependable, renewable energy.",
                'image_url' => "https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?auto=format&fit=crop&q=80&w=1920",
                'cta_primary_text' => 'Learn More',
                'cta_primary_url' => '/offer',
                'cta_secondary_text' => 'Explore Our Projects',
                'cta_secondary_url' => '/projects',
                'is_active' => true,
                'order' => 1,
            ],
            [
                'title' => "Transforming Marine Energy into Reliable Electricity",
                'subtitle' => "Clean Ocean Energy",
                'description' => "Dependable, renewable energy for homes, industries, and hydrogen production.",
                'image_url' => "https://images.unsplash.com/photo-1466611653911-954ff21b6748?auto=format&fit=crop&q=80&w=1920",
                'cta_primary_text' => 'Learn More',
                'cta_primary_url' => '/offer',
                'cta_secondary_text' => 'Explore Our Projects',
                'cta_secondary_url' => '/projects',
                'is_active' => true,
                'order' => 2,
            ],
            [
                'title' => "Turning the Tide Toward a Sustainable Future",
                'subtitle' => "Zero Emissions",
                'description' => "Unlocking the immense power of ocean waves to produce clean, sustainable electricity.",
                'image_url' => "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&q=80&w=1920",
                'cta_primary_text' => 'Learn More',
                'cta_primary_url' => '/offer',
                'cta_secondary_text' => 'Explore Our Projects',
                'cta_secondary_url' => '/projects',
                'is_active' => true,
                'order' => 3,
            ]
        ];

        foreach ($slides as $slide) {
            HeroSlide::updateOrCreate(['title' => $slide['title']], $slide);
        }
    }

    private function seedServices(): void
    {
        Service::query()->delete();
        $services = [
            [
                'title' => "Electricity Production",
                'slug' => 'electricity',
                'description' => "Our core focus is delivering consistent, grid-ready renewable electricity. We leverage advanced wave and hydro technologies from partners like Eco Wave Power, Seaturns, KCT, Net Zero Technology Centre, and ETZ Ltd to provide reliable power to coastal grids and industrial hubs.",
                'icon' => "Zap",
                'image_url' => "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=800",
                'is_active' => true,
                'order' => 1,
            ],
            [
                'title' => "Green Hydrogen",
                'slug' => 'hydrogen',
                'description' => "Utilizing our surplus renewable energy to power high-efficiency electrolysers. We produce clean, green hydrogen for zero-emission transport, heating, and industrial decarbonization, creating a sustainable energy storage loop.",
                'icon' => "Droplets",
                'image_url' => "https://images.unsplash.com/photo-1614730321146-b6fa6a46bac4?auto=format&fit=crop&q=80&w=800",
                'is_active' => true,
                'order' => 2,
            ],
            [
                'title' => "Oxygen Generation",
                'slug' => 'oxygen',
                'description' => "Harnessing the bypass products of hydrogen electrolysis to supply high-purity oxygen. Our localized production systems provide critical supplies for medical, industrial, and specialized marine applications, all powered by the ocean.",
                'icon' => "Factory",
                'image_url' => "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
                'is_active' => true,
                'order' => 3,
            ]
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(['slug' => $service['slug']], $service);
        }
    }

    private function seedPartners(): void
    {
        Partner::query()->delete();
        $partners = [
            [
                'name' => "Seaturns",
                'description' => "An innovative developer of wave energy converters, focusing on high-efficiency marine energy extraction.",
                'url' => "https://seaturns.com/",
                'image_url' => "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&q=80&w=400",
                'is_active' => true,
                'order' => 1,
            ],
            [
                'name' => "Eco Wave Power",
                'description' => "A world leader in onshore wave energy technology. Their patented solution enables scalable, commercial power generation.",
                'url' => "https://www.ecowavepower.com/",
                'image_url' => "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=400",
                'is_active' => true,
                'order' => 2,
            ],
            [
                'name' => "KCT Vortex (KourisPower)",
                'description' => "Strategic partner for the revolutionary KCT Vortex Turbine technology.",
                'url' => "https://www.kourispower.com/",
                'image_url' => "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=400",
                'is_active' => true,
                'order' => 3,
            ],
            [
                'name' => "Port of Ngqura",
                'description' => "Strategic deep-water port partner in South Africa, ideal for large-scale wave power, green hydrogen, and oxygen projects.",
                'url' => "#",
                'image_url' => "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=400",
                'is_active' => true,
                'order' => 4,
            ],
            [
                'name' => "Fraserburgh Harbour",
                'description' => "Collaborating to develop an on-shore energy hub capable of producing electricity, hydrogen, and oxygen.",
                'url' => "https://fraserburgh-harbour.co.uk/",
                'image_url' => "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=400",
                'is_active' => true,
                'order' => 5,
            ],
            [
                'name' => "Peterhead Port",
                'description' => "Integrating marine-based renewable technologies for multi-product energy generation.",
                'url' => "#",
                'image_url' => "https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=400",
                'is_active' => true,
                'order' => 6,
            ],
            [
                'name' => "Net Zero Technology Centre",
                'description' => "Advancing clean energy technologies and sustainable offshore solutions.",
                'url' => "https://www.netzerotc.com/",
                'image_url' => "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=400",
                'is_active' => true,
                'order' => 7,
            ],
            [
                'name' => "ETZ Ltd",
                'description' => "Energy Transition Zone in Aberdeen, driving the growth of offshore renewables.",
                'url' => "https://etzltd.com/",
                'image_url' => "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400",
                'is_active' => true,
                'order' => 8,
            ]
        ];

        foreach ($partners as $partner) {
            Partner::updateOrCreate(['name' => $partner['name']], $partner);
        }
    }

    private function seedProjects(): void
    {
        $projects = [
            [
                'title' => "Ngqura Port Hub",
                'location' => "South Africa",
                'description' => "A multi-product energy hub featuring 8.3MW wave energy capacity. This project serves as a pilot for clean electricity production, green hydrogen electrolysis, and medical-grade oxygen generation for the region.",
                'image_url' => "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800",
                'status' => 'In Progress',
                'is_featured' => true,
                'capacity' => '8.3MW',
            ],
            [
                'title' => "Fraserburgh Harbour Masterplan",
                'location' => "Scotland",
                'description' => "Transforming Fraserburgh into a sustainable marine port. The integrated installation will produce electricity for local quayside operations, alongside hydrogen and oxygen for the maritime supply chain.",
                'image_url' => "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800",
                'status' => 'In Progress',
                'is_featured' => true,
                'capacity' => 'Phase 1: 5MW',
            ],
            [
                'title' => "Peterhead Energy Hub",
                'location' => "Scotland",
                'description' => "Leveraging deep-water capabilities to create a strategic base for unified energy production. Delivering electricity, hydrogen, and oxygen to future-proof offshore logistics.",
                'image_url' => "https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=800",
                'status' => 'Pipeline',
                'is_featured' => true,
                'capacity' => 'TBD',
            ]
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(['title' => $project['title']], tap($project, function(&$p) { $p['is_active'] = true; }));
        }
    }

    private function seedTeamMembers(): void
    {
        $members = [
            [
                'name' => "Alphonsus Ukah",
                'role' => "Chairman",
                'bio' => "A veteran of the oil and gas sector with over 30 years' experience. Alphonsus provides strategic direction and governance, advocating for the transition toward ocean-based renewable energy solutions.",
                'image_url' => "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
                'order' => 1,
            ],
            [
                'name' => "Wilfred Emmanuel",
                'role' => "Chief Executive Officer (CEO)",
                'bio' => "A Global Chartered Accountant and MBA in Leadership, Wilfred drives operational excellence and partnerships to deliver scalable, impact-driven energy solutions.",
                'image_url' => "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
                'order' => 2,
            ],
            [
                'name' => "Rosie Banks",
                'role' => "Business Development Director (BDD)",
                'bio' => "A renewable energy strategist leading business growth, partnerships, and stakeholder engagement with harbours, hydrogen producers, and utility companies.",
                'image_url' => "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
                'order' => 3,
            ],
            [
                'name' => "Edgar Adams",
                'role' => "Technical Director",
                'bio' => "Expert in marine engineering and renewable technology integration, overseeing the technical deployment of wave and hydro systems.",
                'image_url' => "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
                'order' => 4,
            ]
        ];

        foreach ($members as $member) {
            TeamMember::updateOrCreate(['name' => $member['name']], tap($member, function(&$p) { $p['is_active'] = true; }));
        }
    }

    private function seedBlogPosts(): void
    {
        $posts = [
            [
                'title' => "The Future of Wave Energy in the North Sea",
                'slug' => Str::slug("The Future of Wave Energy in the North Sea"),
                'excerpt' => "Exploring the untapped potential of marine energy in Scotland's coastal waters and its role in the net-zero transition.",
                'content' => "The North Sea has long been a powerhouse for the UK's energy needs. As we transition away from fossil fuels, the focus is shifting to the immense power of the waves. Allied Energies is at the forefront of this transition, deploying cutting-edge wave energy converters that can provide consistent, reliable power...",
                'image_url' => "https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?auto=format&fit=crop&q=80&w=800",
                'category' => "Technology",
                'author' => "Rosie Banks",
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => "Green Hydrogen: The Missing Link in Renewable Energy",
                'slug' => Str::slug("Green Hydrogen: The Missing Link in Renewable Energy"),
                'excerpt' => "How wave and hydro energy can power the next generation of clean transport and industrial processes.",
                'content' => "Green hydrogen is produced through electrolysis powered by renewable energy. While wind and solar are key, wave energy offers a more consistent power source for hydrogen production. Allied Energies is developing hybrid systems that combine these sources to ensure a steady supply of clean hydrogen...",
                'image_url' => "https://images.unsplash.com/photo-1614730321146-b6fa6a46bac4?auto=format&fit=crop&q=80&w=800",
                'category' => "Hydrogen",
                'author' => "Wilfred Emmanuel",
                'published_at' => now()->subDays(20),
            ],
            [
                'title' => "Sustainable Coastal Development: A Collaborative Approach",
                'slug' => Str::slug("Sustainable Coastal Development: A Collaborative Approach"),
                'excerpt' => "Partnering with harbours and local communities to build resilient marine energy hubs.",
                'content' => "Coastal communities are on the front lines of climate change. By integrating renewable energy into harbour infrastructure, we can create jobs and ensure energy security. Our partnership with Fraserburgh Harbour is a prime example of how industry and local authorities can work together...",
                'image_url' => "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=800",
                'category' => "Community",
                'author' => "Alphonsus Ukah",
                'published_at' => now()->subDays(30),
            ]
        ];

        foreach ($posts as $post) {
            BlogPost::updateOrCreate(['slug' => $post['slug']], tap($post, function(&$p) { $p['is_published'] = true; }));
        }
    }

    private function seedContentSettings(): void
    {
        $settings = [
            'home_stats' => [
                ['label' => 'Clean Energy Potential', 'value' => '500MW+', 'icon' => 'Zap'],
                ['label' => 'Project Pipeline', 'value' => '12+', 'icon' => 'MapPin'],
                ['label' => 'Strategic Partners', 'value' => '15+', 'icon' => 'ExternalLink'],
                ['label' => 'Zero Emissions', 'value' => '100%', 'icon' => 'Waves'],
            ],
            'home_process' => [
                [
                    'title' => "Wave Capture",
                    'description' => "Floaters attached to coastal structures move with the rising and falling of waves.",
                    'icon' => "Waves",
                ],
                [
                    'title' => "Energy Conversion",
                    'description' => "Motion is converted into hydraulic pressure, which drives a generator to produce electricity.",
                    'icon' => "Zap",
                ],
                [
                    'title' => "Grid Integration",
                    'description' => "The clean energy is fed directly into the national grid or used for hydrogen production.",
                    'icon' => "TrendingUp",
                ]
            ],
            'home_impact' => [
                ['label' => 'CO2 Emissions Saved', 'value' => '250k Tons', 'icon' => 'Leaf', 'color' => 'bg-emerald-500'],
                ['label' => 'Homes Powered', 'value' => '150,000', 'icon' => 'Home', 'color' => 'bg-blue-500'],
                ['label' => 'Marine Life Protection', 'value' => '100%', 'icon' => 'Shield', 'color' => 'bg-primary'],
                ['label' => 'Local Jobs Created', 'value' => '2,500+', 'icon' => 'User', 'color' => 'bg-secondary'],
            ],
            'home_faqs' => [
                [
                    'question' => "What makes wave energy reliable?",
                    'answer' => "Ocean waves are consistent and predictable, ensuring dependable power generation compared to the more intermittent nature of wind or solar."
                ],
                [
                    'question' => "How does Allied Energies promote sustainability?",
                    'answer' => "By developing zero-emission power systems, creating local jobs, and minimizing environmental impact through smart, eco-friendly technologies."
                ],
                [
                    'question' => "Where are your operations based?",
                    'answer' => "Allied Energies is headquartered in Aberdeen, Scotland, with projects expanding across coastal regions in Europe and Africa."
                ]
            ],
            'home_global' => [
                [
                    'region' => 'United Kingdom',
                    'locations' => ['Aberdeen (Headquarters)', 'Fraserburgh Harbour', 'Peterhead Port']
                ],
                [
                    'region' => 'International',
                    'locations' => ['Port of Ngqura, South Africa', 'Coastal Projects, West Africa', 'European Marine Hubs']
                ]
            ]
        ];

        foreach ($settings as $key => $value) {
            ContentSetting::updateOrCreate(
                ['key' => $key],
                ['value' => json_encode($value), 'type' => 'json']
            );
        }
    }

    private function seedTestimonials(): void
    {
        $testimonials = [
            [
                'quote' => "Allied Energies is redefining what's possible in the marine energy sector. Their commitment to sustainability and technical excellence is unmatched.",
                'name' => "Dr. Sarah Jenkins",
                'role' => "Marine Energy Researcher",
                'image_path' => null, // Would require downloading the image to storage if we seeded images as files, 
                // but since the original seeder used a URL, we'll need to adapt the model to handle URLs or just leave it null for testing
                'order' => 1,
                'is_active' => true,
            ],
            [
                'quote' => "The integration of wave energy into our harbour infrastructure has been a game-changer for our local energy security and net-zero goals.",
                'name' => "James MacLeod",
                'role' => "Port Authority Director",
                'image_path' => null,
                'order' => 2,
                'is_active' => true,
            ],
            [
                'quote' => "A visionary company with a practical approach. Their vortex turbine technology is a breakthrough for micro-hydro power generation.",
                'name' => "Elena Rodriguez",
                'role' => "Renewable Energy Consultant",
                'image_path' => null,
                'order' => 3,
                'is_active' => true,
            ]
        ];

        foreach ($testimonials as $t) {
            Testimonial::updateOrCreate(['name' => $t['name']], $t);
        }
    }

    private function seedSiteSettings(): void
    {
        $settings = [
            // General
            ['key' => 'site_name', 'value' => 'Allied Energies Ltd', 'type' => 'text', 'group' => 'general', 'label' => 'Site Name'],
            ['key' => 'site_logo', 'value' => null, 'type' => 'image', 'group' => 'general', 'label' => 'Site Logo'],
            ['key' => 'site_description', 'value' => 'Harnessing the power of ocean waves for a cleaner tomorrow.', 'type' => 'textarea', 'group' => 'general', 'label' => 'Site Description'],
            
            // Contact
            ['key' => 'contact_email', 'value' => 'info@alliedenergies.com', 'type' => 'text', 'group' => 'contact', 'label' => 'Contact Email'],
            ['key' => 'contact_phone', 'value' => '+44 (0) 1224 000000', 'type' => 'text', 'group' => 'contact', 'label' => 'Contact Phone'],
            ['key' => 'contact_address', 'value' => 'Aberdeen, Scotland, UK', 'type' => 'textarea', 'group' => 'contact', 'label' => 'Office Address'],
            
            // Social
            ['key' => 'social_linkedin', 'value' => 'https://linkedin.com/company/allied-energies', 'type' => 'text', 'group' => 'social', 'label' => 'LinkedIn URL'],
            ['key' => 'social_twitter', 'value' => 'https://twitter.com/alliedenergies', 'type' => 'text', 'group' => 'social', 'label' => 'Twitter URL'],
            
            // SEO
            ['key' => 'seo_title', 'value' => 'Allied Energies | Renewable Wave Power IPP', 'type' => 'text', 'group' => 'seo', 'label' => 'Meta Title'],
            ['key' => 'seo_description', 'value' => 'Allied Energies is a leading Independent Power Producer (IPP) focused on marine and wave energy solutions.', 'type' => 'textarea', 'group' => 'seo', 'label' => 'Meta Description'],
            ['key' => 'seo_keywords', 'value' => 'wave energy, marine power, renewable energy, hydro power, green hydrogen', 'type' => 'text', 'group' => 'seo', 'label' => 'Meta Keywords'],
        ];

        foreach ($settings as $setting) {
            \App\Models\SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
