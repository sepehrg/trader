import React, { useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as d3 from "d3";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  root: {
    direction: "ltr",
  },
  tooltip: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main,
  },
}));

const PieChart = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();

  const ref = useRef(null);
  const leger = useRef(null);

  var div = d3
    .select("body")
    .append("div")
    .style("font-size", "11px")
    .style("display", "none")
    .style("position", "absolute")
    .attr("class", classes.tooltip)
    .style("background-color", theme.palette.primary.main)
    .style("border-radius", "6px")
    .style("padding", "3px 4px")
    .style("box-shadow", "0px 0px 1px 0px #000");

  var radius = Math.min(props.width, props.height) / 2 - props.margin;
  const createPie = d3
    .pie()
    .value((d) => (d.TotalTradeValue ? d.TotalTradeValue : 1))
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".2f");

  useEffect(() => {
    const data = createPie(props.data);
    const group = d3.select(ref.current);
    const groupWithData = group.selectAll("g.arc").data(data);

    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);
    var outerArc2 = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc");

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"));
    path
      .attr("class", "arc")
      .attr("d", createArc)
      .attr("fill", (d, i) => colors(i))
      .on("mouseover", function (d, i) {
        d3.select(this).transition().duration("50").attr("opacity", ".85");
        div.style("display", "block");
        div.style("color", "#FFF");
        div
          .html(
            `${i.data.SectorTitle} (${
              i.data.TotalTradeValue
                ? parseFloat(
                    (i.data.TotalTradeValue / props.sum) * 100
                  ).toFixed(2)
                : 0
            }%)`
          )
          .style("left", d.pageX + 10 + "px")
          .style("top", d.pageY - 15 + "px");
      })
      .on("mouseout", function (d, i) {
        d3.select(this).transition().duration("50").attr("opacity", "1");
        div.style("display", "none");
      });

    const text = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"));

    if (device.isNotMobile) {
      text
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("fill", theme.palette.text.primary)
        .style("font-size", 10)
        .style("direction", "ltr")
        .text(function (d) {
          if ((d.data.TotalTradeValue / props.sum) * 100 > 2.5) {
            return `(${
              d.data.TotalTradeValue
                ? parseFloat(
                    (d.data.TotalTradeValue / props.sum) * 100
                  ).toFixed(2)
                : 0
            }%) ${d.data.SectorTitle}`;
          }
        })
        .attr("transform", function (d) {
          var pos = outerArc2.centroid(d);
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
          return "translate(" + pos + ")";
        })
        .style("text-anchor", function (d) {
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < Math.PI ? "start" : "end";
        });

      const polyline = groupWithUpdate
        .append("polyline")
        .merge(groupWithData.select("polyline"));
      polyline
        .attr("stroke", theme.palette.text.secondary)
        .style("fill", "none")
        .attr("stroke-width", 2)
        .attr("points", function (d) {
          if ((d.data.TotalTradeValue / props.sum) * 100 > 2.5) {
            var posA = arc.centroid(d); // line insertion in the slice
            var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
            var posC = outerArc.centroid(d); // Label position = almost the same as posB
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            return [posA, posB, posC];
          }
        });
    } else {
      groupWithUpdate
        .append("rect")
        .attr("transform", function (d, i) {
          return `translate(${
            props.width / 2 - 50
          },${props.height / 2 + i * 30})`;
        })
        .attr("height", 20)
        .attr("width", 20)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", (d, i) => colors(i));
      text
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("fill", theme.palette.text.primary)
        .style("font-size", 12)
        .style("direction", "ltr")
        .text(function (d, i) {
          return `(${
            d.data.TotalTradeValue
              ? parseFloat((d.data.TotalTradeValue / props.sum) * 100).toFixed(
                  2
                )
              : 0
          }%) ${d.data.SectorTitle}`;
        })
        .attr("transform", function (d, i) {
          return `translate(${
            props.width / 2 - 60
          },${props.height / 2 + i * 30 + 8})`;
        })
        .style("text-anchor", "end");
      // .attr("fill", (d, i) => colors(i))
    }
  }, [props.data, props.sum, theme]);

  return (
    <>
      <svg
        width={props.width < 0 ? 0 : props.width}
        height={device.isNotMobile ? props.height : null}
      >
        <g
          ref={ref}
          transform={`translate(${props.width / 2} ${
            device.isNotMobile ? props.height / 2 : props.height / 2 - 30
          })`}
        />
      </svg>
      <div ref={leger}></div>
    </>
  );
};

export default PieChart;
