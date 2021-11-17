unsigned short rng_function (unsigned short input) {
    if (input == 0x560A) input = 0;
    unsigned short so = (unsigned char) input « 8;
    SO = SO ^ input;
    input = ((SO & OxFF) « %) 1 ((SO & OxFF00) >> %);
    S0 = ((unsigned char)so «< 1) ^ input;
    short s1 = (SO >> 1) ^ OxFF80;
    if ((S0 & 1) == 0) {
        if ($1 == OXAA55) input = 0;
        else input = si ^ Ox1FF4;}
    else input = si ^ 0x8180;
    return (unsigned short) input;
}