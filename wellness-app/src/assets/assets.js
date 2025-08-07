
const sessions = [
    {
        id: 1,
        title: 'Morning Yoga Flow',
        description: 'Start your day with this energizing 20-minute yoga sequence designed to awaken your body and mind',
        duration: '20 min',
        instructor: 'Sarah Mitchell',
        date: 'Jan 15, 2024',
        tags: ['yoga', 'beginner'],
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop&crop=center'
    },
    {
        id: 2,
        title: 'Mindful Breathing',
        description: 'A guided breathing exercise to reduce stress and anxiety, perfect for busy schedules',
        duration: '10 min',
        instructor: 'David Chen',
        date: 'Jan 14, 2024',
        tags: ['breathing', 'beginner'],
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&crop=center'
    },
    {
        id: 3,
        title: 'Body Scan Meditation',
        description: 'Deep relaxation through progressive body awareness and mindful attention',
        duration: '15 min',
        instructor: 'Sarah Mitchell',
        date: 'Jan 13, 2024',
        tags: ['meditation', 'intermediate'],
        image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=200&fit=crop&crop=center'
    },
    {
        id: 4,
        title: 'Sunset Mindfulness',
        description: 'Connect with nature through mindful observation and presence practice',
        duration: '12 min',
        instructor: 'Maya Patel',
        date: 'Jan 12, 2024',
        tags: ['mindfulness', 'beginner'],
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&crop=center'
    },
    {
        id: 5,
        title: 'Power Vinyasa Flow',
        description: 'Dynamic yoga sequence to build strength, flexibility, and endurance',
        duration: '45 min',
        instructor: 'Alex Thompson',
        date: 'Jan 11, 2024',
        tags: ['yoga', 'advanced'],
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&crop=center'
    }
];

const imageOptions = [
    "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=200&fit=crop&crop=center", // Yoga in sunset
    "https://images.unsplash.com/photo-1525097487452-6278ff080c31?w=400&h=200&fit=crop&crop=center", // Mountain landscape
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=200&fit=crop&crop=center", // Calm ocean
    "https://images.unsplash.com/photo-1532877590696-69a9f1a3c1a7?w=400&h=200&fit=crop&crop=center", // Meditation pose
    "https://images.unsplash.com/photo-1613876215077-b6eabedc3c3d?w=400&h=200&fit=crop&crop=center", // Beach yoga
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=200&fit=crop&crop=center", // Nature hike
    "https://images.unsplash.com/photo-1520975922203-b5b79b1f8f56?w=400&h=200&fit=crop&crop=center", // Sunrise in forest
    "https://images.unsplash.com/photo-1504198266285-1659872e6590?w=400&h=200&fit=crop&crop=center", // Hot springs or spa
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=200&fit=crop&crop=center", // Minimal calm design
    "https://images.unsplash.com/photo-1594737625785-c84ab9a98edc?w=400&h=200&fit=crop&crop=center", // Peaceful tea moment
];

export { sessions, imageOptions }