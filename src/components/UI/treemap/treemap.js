import React, { useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as d3 from "d3";
import clsx from "clsx";

const tooltip = { width: 300, height: 193 };

const useStyles = makeStyles((theme) => ({
  root: {
    direction: "ltr",
  },
  tooltip: {
    position: "absolute",
    textAlign: "center",
    width: tooltip.width,
    height: tooltip.height,
    padding: "2px",
    background: theme.palette.background.default,
    border: `1px solid ${theme.palette.border.primary}`,
    pointerEvents: "none",
    marginTop: 25,
    marginLeft: 15,
  },
  instrument: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3px 10px",
  },
  instrumentName: {
    textAlign: "right",
  },
  instrumentRate: {
    direction: "ltr",
  },
  main: {
    padding: 10,
    backgroundColor: theme.palette.background.paper,
  },
  fullname: {
    fontSize: 10,
  },
}));

const Treemap = ({ data, margin, width, height, ...props }) => {
  const myRef = useRef();
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    if (data) {
      drawChart();
    }
  }, [data, theme, width, height]);

  const drawChart = () => {
    myRef.current.innerHTML = "";

    // set the dimensions of the graph
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    // append the svg obgect to the body of the page
    const svg = d3
      .select(myRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var root = d3.hierarchy(data).sum(function (d) {
      return d.value;
    }); // Here the size of each leave is given in the 'value' field in input data

    // Then d3.treemap computes the position of each element of the hierarchy
    d3
      .treemap()
      .size([width, height])
      .paddingTop(20)
      .paddingRight(5)
      .paddingInner(1)(root);

    // prepare a color scale
    var color = d3
      .scaleOrdinal()
      .domain([-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6])
      .range([
        "#D62D4D",
        "#D62D4D",
        "#D62D4D",
        "#9A2C42",
        "#9A2C42",
        "#7B3E50",
        "#4E4752", //0
        "#356958",
        "#1B8B5F",
        "#1B8B5F",
        "#02AD65",
        "#02AD65",
        "#02AD65",
      ]);

    const persianCode = (d) => {
      return d.x1 - d.x0 - 15 >
        BrowserText.getWidth(d.data.name, getNameFontSize(d)) &&
        d.y1 - d.y0 > 25
        ? d.data.name
        : "";
    };

    const getNameFontSize = (d) => {
      let size = 24;
      while (BrowserText.getWidth(d.data.name, size) / (d.x1 - d.x0) > 0.4) {
        size--;
        if (size < 11) break;
      }
      return size;
    };

    const getRateFontSize = (d) => {
      let size = 16;
      while (BrowserText.getWidth(d.data.rate, size) / (d.x1 - d.x0) > 0.4) {
        size--;
        if (size < 10) break;
      }
      return size;
    };

    const change = (d) => {
      const textWidth = BrowserText.getWidth(
        d.data.rate + "%",
        getRateFontSize(d)
      );
      const squareWidth = d.x1 - d.x0;
      const textHeight =
        (d.y1 - d.y0) / 2 +
        BrowserText.getHeight(d.data.rate, getRateFontSize(d)) +
        BrowserText.getHeight(d.data.name, getNameFontSize(d));
      const squareHeight = d.y1 - d.y0;
      return textHeight < squareHeight && textWidth < squareWidth
        ? d.data.rate + "%"
        : "";
    };

    const industry = (d) => {
      const width = BrowserText.getWidth(d.data.name, 12);
      if (d.x1 - d.x0 - 10 > width) return d.data.name;
      else {
        let name = d.data.name;
        for (let i = 0; i < d.data.name.length; i++) {
          name = name.substring(0, name.length - 1);
          if (d.x1 - d.x0 - 30 > BrowserText.getWidth(name, 12)) break;
        }
        return name ? name + "..." : "";
      }
    };

    const onMousemove = (event, d) => {
      div.style("display", "block");
      div
        .html(function () {
          return tooltipContent(d);
        })
        .style("left", function () {
          return getTooltipLeft(event.clientX) + "px";
        })
        .style("top", getTooltipTop(event.clientY) + "px");
    };

    const onMouseout = (d) => {
      div.style("display", "none");
    };

    const getTooltipLeft = (x) => {
      return x + tooltip.width > myRef.current.clientWidth
        ? x - tooltip.width - 30
        : x;
    };

    const getTooltipTop = (y) => {
      return y + tooltip.height - 50 > myRef.current.clientHeight
        ? y - tooltip.height - 30
        : y;
    };

    const tooltipContent = (d) => {
      const collection =
        d.depth === 1
          ? d.data.children.slice(0, 5)
          : d.parent.data.children.slice(0, 5);
      const t = d.depth === 1 ? collection[0] : d.data;
      const highlight =
        `<div class='${clsx(classes.instrument, classes.main)}'>` +
        `<div class='${classes.instrumentName}'>${t.name}<br /><span class='${classes.fullname}'>${t.InstrumentTitle}</span></div>` +
        `<div class='${classes.instrumentRate}'>${t.rate}%</div>` +
        "</div>";
      const tops = collection
        .filter((c) => c.Id !== t.Id)
        .slice(0, 4)
        .map(
          (i) =>
            `<div class='${classes.instrument}'>` +
            `<div class='${classes.instrumentName}'>${i.name}</div>` +
            `<div class='${classes.instrumentRate}'>${i.rate}%</div>` +
            "</div>"
        )
        .join("");
      return d.data.Sector + highlight + tops;
    };

    // Define the div for the tooltip
    var div = d3
      .select("body")
      .append("div")
      .attr("class", classes.tooltip)
      .style("display", "none");

    // use this information to add rectangles:
    svg
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return d.x0;
      })
      .attr("y", function (d) {
        return d.y0;
      })
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .style("fill", function (d) {
        return color(parseInt(d.data.rate));
      })
      .style("opacity", function (d) {
        return 1;
      })
      .on("mousemove", onMousemove)
      .on("mouseout", onMouseout);

    // and to add the text labels
    svg
      .selectAll("persianCode")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("x", function (d) {
        return (
          (d.x1 -
            d.x0 -
            BrowserText.getWidth(d.data.name, getNameFontSize(d))) /
            2 +
          d.x0 -
          5
        );
      }) // +10 to adjust position (more right)
      .attr("y", function (d) {
        return (d.y1 - d.y0) / 2 + d.y0;
      }) // +20 to adjust position (lower)
      .text(function (d) {
        return persianCode(d);
      })
      .attr("font-size", function (d) {
        return getNameFontSize(d);
      })
      .attr("fill", "white")
      .on("mousemove", onMousemove)
      .on("mouseout", onMouseout);

    // and to add the text labels
    svg
      .selectAll("change")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("x", function (d) {
        return (
          (d.x1 -
            d.x0 -
            BrowserText.getWidth(d.data.rate + "%", getRateFontSize(d))) /
            2 +
          d.x0 //-
          //5
        );
      }) // +10 to adjust position (more right)
      .attr("y", function (d) {
        return (
          (d.y1 - d.y0) / 2 +
          d.y0 +
          BrowserText.getHeight(d.data.rate, getRateFontSize(d)) * 2
        );
      }) // +20 to adjust position (lower)
      .text(function (d) {
        return change(d);
      })
      .attr("font-size", function (d) {
        return getRateFontSize(d);
      })
      .attr("fill", "white")
      .on("mousemove", onMousemove)
      .on("mouseout", onMouseout);

    // Add title for groups
    svg
      .selectAll("industry")
      .data(
        root.descendants().filter(function (d) {
          return d.depth == 1 && d.value > 3500000;
        })
      )
      .enter()
      .append("text")
      .attr("x", function (d) {
        return (
          (d.x1 - d.x0 - BrowserText.getWidth(industry(d), 12)) / 2 + d.x0 - 10
        );
      })
      .attr("y", function (d) {
        return d.y0 + 12;
      })
      .text(function (d) {
        return industry(d);
      })
      .attr("font-size", "12px")
      .attr("fill", theme.palette.text.primary)
      .on("mousemove", onMousemove)
      .on("mouseout", onMouseout);
  };

  const BrowserText = (function () {
    var canvas = document.createElement("canvas"),
      context = canvas.getContext("2d");

    /**
     * Measures the rendered width of arbitrary text given the font size and font face
     * @param {string} text The text to measure
     * @param {number} fontSize The font size in pixels
     * @param {string} fontFace The font face ("Arial", "Helvetica", etc.)
     * @returns {number} The width of the text
     **/
    function getWidth(text, fontSize, fontFace) {
      context.font = fontSize + "px " + fontFace;
      return context.measureText(text).width;
    }

    function getHeight(text, fontSize, fontFace) {
      context.font = fontSize + "px " + fontFace;
      const metrics = context.measureText(text);
      return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    }

    return {
      getWidth,
      getHeight,
    };
  })();

  return (
    <div className={clsx(classes.root, props.className)} ref={myRef}></div>
  );
};

export default Treemap;
