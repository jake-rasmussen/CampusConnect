import { Card, Checkbox, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { ApplicationSubmissionEvaluation, ApplicationSubmissionEvaluationGrade, User } from "@prisma/client";
import Link from "next/link";
import { Check, ClockEdit, Cross, QuestionMark, X } from "tabler-icons-react";

type PropType = {
  projectId: string;
  applicationSubmissions: {
    id: string;
    user: User;
    applicationSubmissionEvaluation: ApplicationSubmissionEvaluation | null;
  }[];
};

const ApplicationSubmissionsTable = (props: PropType) => {
  const { projectId, applicationSubmissions } = props;

  const sortedApplicationSubmissions = applicationSubmissions.sort((a, b) => {
    const firstCharA = a.user.firstName.charAt(0);
    const firstCharB = b.user.firstName.charAt(0);
    return firstCharA.localeCompare(firstCharB);
  });

  return (
    <Card className="mx-4">
      <Table className="rounded-2xl">
        <TableHeader>
          <TableColumn>Candidate Name</TableColumn>
          <TableColumn>Application ID</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>

        <TableBody>
          {sortedApplicationSubmissions.map(
            (applicationSubmission, index: number) => (
              <TableRow key={`submissionRow${index}`}>
                <TableCell className="font-medium text-primary underline">
                  <Link
                    href={`/evaluator/${projectId}/evaluate/${applicationSubmission.id}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {applicationSubmission.user.firstName}{" "}
                    {applicationSubmission.user.lastName}
                  </Link>
                </TableCell>
                <TableCell className="font-medium">
                  {applicationSubmission.id}
                </TableCell>
                <TableCell className="flex justify-center items-center">
                  <Checkbox icon={
                    applicationSubmission.applicationSubmissionEvaluation ?
                      (applicationSubmission.applicationSubmissionEvaluation.evaluation === ApplicationSubmissionEvaluationGrade.YES ? <Check /> :
                        applicationSubmission.applicationSubmissionEvaluation.evaluation === ApplicationSubmissionEvaluationGrade.MAYBE ? <QuestionMark /> :
                          applicationSubmission.applicationSubmissionEvaluation.evaluation === ApplicationSubmissionEvaluationGrade.NO ? <X /> : <ClockEdit />) :
                      <ClockEdit />
                  }
                    isSelected
                    isReadOnly
                  />
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ApplicationSubmissionsTable;
