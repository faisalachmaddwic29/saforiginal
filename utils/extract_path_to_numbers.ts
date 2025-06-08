export const extractPathToNumbers = (input: string): number[] => {
    const segments = input.split('/').filter(segment => segment !== '');

    // Extract the second and third numbers
    const middleNumbers = segments.slice(0,-1).map(segment => parseInt(segment, 10));

    return middleNumbers;
}
