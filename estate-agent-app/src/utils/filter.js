// src/utils/filter.js

export const filterProperties = (properties, criteria) => {
    return properties.filter((prop) => {
        const { type, minPrice, maxPrice, minBeds, maxBeds, dateAfter, dateBefore, postcode } = criteria;

        // 1. Type Match (Case insensitive)
        if (type && type !== "Any" && prop.type.toLowerCase() !== type.toLowerCase()) {
            return false;
        }

        // 2. Price Range
        if (minPrice && prop.price < parseInt(minPrice)) return false;
        if (maxPrice && prop.price > parseInt(maxPrice)) return false;

        // 3. Bedroom Range
        if (minBeds && prop.bedrooms < parseInt(minBeds)) return false;
        if (maxBeds && prop.bedrooms > parseInt(maxBeds)) return false;

        // 4. Postcode Match (First part, e.g., "BR1")
        if (postcode) {
            // Extract first part of postcode from location string
            const propPostcode = prop.location.split(" ").pop(); // Assumes format "Street, Area, POSTCODE"
            if (!propPostcode.startsWith(postcode.toUpperCase())) return false;
        }

        // 5. Date Logic
        // Convert prop.added object to JS Date
        const monthMap = { "January":0, "February":1, "March":2, "April":3, "May":4, "June":5, "July":6, "August":7, "September":8, "October":9, "November":10, "December":11 };
        const propDate = new Date(prop.added.year, monthMap[prop.added.month], prop.added.day);

        if (dateAfter && propDate < new Date(dateAfter)) return false;
        if (dateBefore && propDate > new Date(dateBefore)) return false;

        return true;
    });
};