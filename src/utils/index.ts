export const generateLetterColors = (): { [key: string]: string } => {
    const avatarBGColors = [
        "#f44336",
        "#e91e63",
        "#9c27b0",
        "#673ab7",
        "#3f51b5",
        "#2196f3",
        "#03a9f4",
        "#00bcd4",
        "#009688",
        "#4caf50",
        "#8bc34a",
        "#cddc39",
        "#ffeb3b",
        "#ffc107",
        "#ff9800",
        "#ff5722",
        "#795548",
        "#9e9e9e",
        "#607d8b",
    ];

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const letterColors: { [key: string]: string } = {};

    alphabet.forEach((letter, index) => {
        letterColors[letter] = avatarBGColors[index % avatarBGColors.length];
    });

    return letterColors;
};
