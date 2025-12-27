import {filterProperties} from "./filter.js";

// Mock Data
const mockData = [
    { id: 1, type: "House", price: 500000, bedrooms: 3, location: "Bromley BR1", added: { month: "October", day: 10, year: 2023 } },
    { id: 2, type: "Flat", price: 300000, bedrooms: 2, location: "Orpington BR6", added: { month: "January", day: 1, year: 2023 } }
];

describe('Search Filter Logic', () => {

    // Test 1: Type
    test('Correctly filters by property type', () => {
        const criteria = { type: "Flat" };
        const result = filterProperties(mockData, criteria);
        expect(result.length).toBe(1);
        expect(result[0].type).toBe("Flat");
    });

    // Test 2: Price
    test('Correctly filters by max price', () => {
        const criteria = { maxPrice: 400000 };
        const result = filterProperties(mockData, criteria);
        expect(result.length).toBe(1); // Should only get the 300k Flat
        expect(result[0].price).toBe(300000);
    });

    // Test 3: Bedrooms
    test('Correctly filters by minimum bedrooms', () => {
        const criteria = { minBeds: 3 };
        const result = filterProperties(mockData, criteria);
        expect(result.length).toBe(1);
        expect(result[0].bedrooms).toBe(3);
    });

    // Test 4: Postcode
    test('Correctly filters by Postcode partial match', () => {
        const criteria = { postcode: "br6" }; // lowercase check
        const result = filterProperties(mockData, criteria);
        expect(result.length).toBe(1);
        expect(result[0].location).toContain("BR6");
    });

    // Test 5: Combination
    test('Correctly handles combined criteria (Type + Price)', () => {
        const criteria = { type: "House", maxPrice: 400000 };
        const result = filterProperties(mockData, criteria);
        expect(result.length).toBe(0); // House is 500k, so should return 0
    });
});