# Persona Template

Template version: `0.1.0`

Status: candidate construction schema.

This Markdown artifact defines Foundry's tagged Persona Candidate anatomy. Text in comments is construction guidance and must be replaced or removed in a populated candidate. Tags and nesting are normative.

<persona_candidate>
  <template_reference>
    <template_version>0.1.0</template_version>
    <template_sha256><!-- Exact digest of this template version. --></template_sha256>
  </template_reference>

  <candidate_reference>
    <candidate_id><!-- Immutable candidate identifier. --></candidate_id>
    <candidate_version><!-- Immutable candidate version. --></candidate_version>
    <profession_queue_position><!-- Exact position in Foundry's admitted queue. --></profession_queue_position>
  </candidate_reference>

  <role>
    <!-- What professional role this persona embodies. -->
  </role>

  <identity>
    <!-- A constructed professional identity; never a source-human identity or impersonation. -->
  </identity>

  <professional_mandate>
    <!-- The contribution this persona is constructed to make, bounded by the admitted profession determination and Castellan packet. -->
  </professional_mandate>

  <attributes>
    <attribute>
      <name></name>
      <behavioral_expression></behavioral_expression>
      <conditions></conditions>
      <limits></limits>
      <evidence_reference></evidence_reference>
    </attribute>
  </attributes>

  <methods>
    <method>
      <name></name>
      <application></application>
      <conditions></conditions>
      <limits></limits>
      <evidence_reference></evidence_reference>
    </method>
  </methods>

  <reasoning>
    <approach></approach>
    <evidence_standard></evidence_standard>
    <uncertainty_behavior></uncertainty_behavior>
  </reasoning>

  <communication>
    <style></style>
    <required_disclosures></required_disclosures>
    <prohibited_representations></prohibited_representations>
  </communication>

  <governance>
    <authorized_conduct></authorized_conduct>
    <mandatory_conduct></mandatory_conduct>
    <prohibited_conduct></prohibited_conduct>
    <refusal_conditions></refusal_conditions>
    <escalation_triggers></escalation_triggers>
    <stop_conditions></stop_conditions>
  </governance>

  <interface>
    <expected_inputs></expected_inputs>
    <expected_outputs></expected_outputs>
  </interface>

  <acceptance_criteria>
    <criterion></criterion>
  </acceptance_criteria>

  <provenance>
    <castellan_packet_reference></castellan_packet_reference>
    <profession_determination_reference></profession_determination_reference>
    <hagiography_packet_reference></hagiography_packet_reference>
    <persona_governance_doctrine_reference></persona_governance_doctrine_reference>
    <reusable_pattern_references></reusable_pattern_references>
    <assembly_record_reference></assembly_record_reference>
    <unresolved_tensions></unresolved_tensions>
  </provenance>

  <artificer_authentication>
    <artificer_reference></artificer_reference>
    <authenticated_at></authenticated_at>
    <candidate_sha256></candidate_sha256>
  </artificer_authentication>
</persona_candidate>

## Conformance

A populated Persona Candidate conforms to this template only when:

- every required tag is present exactly once except repeatable `attribute`, `method`, and `criterion` elements
- tags are correctly nested
- construction comments and placeholders have been removed
- every substantive feature is supported by an exact upstream reference or an attributable assembly decision
- unresolved tensions are explicit
- the candidate fingerprints this exact template version and digest
- Artificer authentication records assembly completion without claiming Persona admission

Conformance does not admit the candidate as a Persona, create an agent definition, recruit an Operative, or authorize deployment.
