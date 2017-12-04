export declare enum SoundType {
    WizardStep = 0,
    FlowerStep = 1,
    FrogStep = 2,
    MushroomStep = 3,
    Pickup = 4,
    GameOver = 5,
    LevelUp = 6,
}
export declare class Sound {
    private sounds;
    load(): Promise<any[]>;
    play(soundType: SoundType): void;
}
