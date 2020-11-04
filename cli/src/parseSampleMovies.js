let message = 'Successfully imported';

export const parseFile = (file) => {
    return new Promise((resolve, reject) => {
        fileToText(file).then(text => {
            const result = parse(text);
            if (result.length === 0) {
                reject('Error: incorrectly formatted or emtpy file');
            } else {
                resolve({
                    result: result,
                    message
                });
            }
        });
    });
};

const fileToText = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
            resolve(e.target.result);
        };
    });
};

const parse = (text) => {
    let movies = [];

    let lines = text.split(/\n/);
    let block = [];

    for (let i = 0; i < lines.length; i++) {
        if (/\S/.test(lines[i])) {
            block.push(lines[i]);
        } else if (block.length !== 0) {
            const movie = parseMovie(block);

                movies.push(movie);

            block = [];
        };
    };
    return movies;
};

const parseMovie = (block) => {
    let title = '';
    let year = '';
    let format = '';
    let stars = '';
    let picture = '';

    let keyHash = {

        'picture': (val) => {
            picture = val;
        },

        'title': (val) => {
            title = val;
        },
        'year': (val) => {
            year = val;
        },
        'format': (val) => {
            format = val;
        },
        'stars': (val) => {
            stars = val;
        }
    };

    for (var i = 0; i < 5; i++) {
        let value = getValue(block[i]) || '';
        let key = getKey(block[i]) || '';
        if (keyHash[key.toLowerCase()]) {
            keyHash[key.toLowerCase()](value.trim());
        };
    };

    return {
        title: title,
        year: year,
        format: format,
        stars: stars,
        picture: picture
    };
};

const getKey = (line) => {
    return line && line.length && line.split(': ')[0];
};

const getValue = (line) => {
    return line && line.length && line.split(': ').slice(1).join(': ');
};