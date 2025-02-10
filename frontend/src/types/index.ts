export interface Lead {
    id: string;
    name: string;
    phoneNumber: string;
    documents?: Document[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Document {
    id: string;
    name: string;
    url: string;
    uploadedAt: Date;
    type: string;
}

export interface Property {
    id: string;
    type: 'Residential' | 'Commercial' | 'Land';
    size: number;
    location: string;
    budget: number;
    isAvailable: boolean;
    description?: string;
    amenities?: string[];
    createdAt: Date;
    updatedAt: Date;
    images?: string[];
} 