import {
    Home,
    Building,
    Factory,
    Zap,
    Shield,
    Wrench,
    MapPin,
    Clock,
    Users,
    Star,
    Award,
    CheckCircle,
    Settings,
    Lightbulb,
    Power,
    Cpu,
    Wifi,
    Battery,
    Cable
} from 'lucide-react';

export const PREDEFINED_ICONS = [
    { id: 'home', name: 'Home', component: Home },
    { id: 'building', name: 'Building', component: Building },
    { id: 'factory', name: 'Factory', component: Factory },
    { id: 'zap', name: 'Zap', component: Zap },
    { id: 'shield', name: 'Shield', component: Shield },
    { id: 'wrench', name: 'Wrench', component: Wrench },
    { id: 'map-pin', name: 'Map Pin', component: MapPin },
    { id: 'clock', name: 'Clock', component: Clock },
    { id: 'users', name: 'Users', component: Users },
    { id: 'star', name: 'Star', component: Star },
    { id: 'award', name: 'Award', component: Award },
    { id: 'check-circle', name: 'Check Circle', component: CheckCircle },
    { id: 'settings', name: 'Settings', component: Settings },
    { id: 'lightbulb', name: 'Lightbulb', component: Lightbulb },
    { id: 'power', name: 'Power', component: Power },
    { id: 'cpu', name: 'CPU', component: Cpu },
    { id: 'wifi', name: 'WiFi', component: Wifi },
    { id: 'battery', name: 'Battery', component: Battery },
    { id: 'cable', name: 'Cable', component: Cable }
];

export const getIconComponent = (iconId: string) => {
    const icon = PREDEFINED_ICONS.find(icon => icon.id === iconId);
    return icon ? icon.component : Home;
};