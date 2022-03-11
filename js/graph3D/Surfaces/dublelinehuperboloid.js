Surfaces.prototype.dublelinehuperboloid = (count = 20, color = null) => {
    let points = [];
    let edges = [];
    let polygons = [];
    const PI = Math.PI;
    let delta = 2 * PI / count;
    let a = 5, b = 5, c = 6;

    // Расставить точки верхней части
    for (let i = 0; i <= PI; i += delta) {
        for (let j = 0; j < 2 * PI; j += delta) {
            const x = c * Math.cosh(i);
            const y = b * Math.cosh(i) * Math.sin(j);
            const z = a * Math.sinh(i) * Math.cos(j);
            points.push(new Point(x, y, z));
        }
    }

    // Расставить точки нижней части
    for (let i = 0; i <= PI; i += delta) {
        for (let j = 0; j < 2 * PI; j += delta) {
            const x = -c * Math.cosh(i);
            const y = -b * Math.cosh(i) * Math.sin(j);
            const z = -a * Math.sinh(i) * Math.cos(j);
            points.push(new Point(x, y, z));
        }
    }

    //Провести рёбра
    for (let i = 0; i < points.length; i++) {
        if ((i + 1) < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1))
        }
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count))
        }
        if ((i + 1) >= count && (i + 1) % count === 0) {
            edges.push(new Edge(i, i - count + 1))
        }
    }

    //Провести полигоны
    if(color == null){
        let color = [];
        for (let i = 0; i <= points.length; i++) {
            if (i % 2 == 0) {color[i] = '#ffffff';}
            else {color[i] = '#000000';}
        }
    for (let i = 0; i < points.length / 2 - count; i++) {
        if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color[i]))
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color[i]))
        }
    }

    for (let i = points.length / 2; i < points.length; i++) {
        if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color[i]))
        } else if ((i + count) < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color[i]))
        }
    }
    }else{
        for (let i = 0; i < points.length / 2 - count; i++) {
            if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color))
            } else if ((i + count) < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
            }
        }
    
        for (let i = points.length / 2; i < points.length; i++) {
            if ((i + 1 + count) < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color))
            } else if ((i + count) < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
            }
        }
    }

    return new Subject(
        points, edges, polygons
    );

}