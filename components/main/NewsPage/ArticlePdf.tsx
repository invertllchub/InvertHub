"use client";

import React from "react";
import { Document, Page, Text, Image, View, StyleSheet, Link } from "@react-pdf/renderer";
import { Block } from "@/types/articles";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        lineHeight: 1.6,
        backgroundColor: "#FFFFFF",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#1E293B",
    },
    paragraph: {
        fontSize: 12,
        marginBottom: 10,
        color: "#334155",
    },
    overview: {
        fontSize: 14,
        fontStyle: "italic",
        marginBottom: 10,
        color: "#475569",
    },
    listItem: {
        marginLeft: 10,
        marginBottom: 4,
    },
    image: {
        marginVertical: 15,
        borderRadius: 8,
    },
    link: {
        color: "#2563EB",
        textDecoration: "underline",
        marginBottom: 10,
    },
});

interface Props {
  blocks: Block[];
}

export const ArticlePdf: React.FC<Props> = ({ blocks }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {blocks.map((block, i) => {
                    switch (block.type) {
                        case "header":
                            return (
                                <Text key={i} style={styles.header}>
                                    {block.data.text}
                                </Text>
                            );

                        case "overview":
                            return (
                                <Text key={i} style={styles.overview}>
                                    {block.data.text}
                                </Text>
                            );

                        case "paragraph":
                            return (
                                <Text key={i} style={styles.paragraph}>
                                    {block.data.text}
                                </Text>
                            );

                        case "list":
                            return (
                                <View key={i} style={{ marginBottom: 10 }}>
                                    {block.data.items.map((item: string, idx: number) => (
                                        <Text key={idx} style={styles.listItem}>
                                            • {item}
                                        </Text>
                                    ))}
                                </View>
                            );

                        case "image":
                            return (
                                <Image
                                key={i}
                                style={styles.image}
                                src={block.data.file.url}
                                />
                            );

                        case "link":
                            return (
                                <Link key={i} src={block.data.url} style={styles.link}>
                                    {block.data.url}
                                </Link>
                            );

                        default:
                            return null;
                    }
                })}
            </Page>
        </Document>
    );
};
